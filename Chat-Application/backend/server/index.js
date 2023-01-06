const express = require("express"); // Node JS web app framework. Primarily back end focused, for building REST API.
const app = express();
const bodyParser = require("body-parser"); // NPM package that parses incoming request bodies in a middleware before you handle it.
const mysql = require("mysql2"); // Installs mysql library. Enables us to "createPool" a connection to the server in backend (MYSQL WB)
const cors = require("cors"); // Cross-Origin-Resource-Sharing; protocol that defines sharing resources of different origins. client/server architecture.
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const cookieParser = require("cookie-parser");
const { createTokens, validateToken } = require("./JWT");
const jwt = require("jsonwebtoken");
const { send } = require("process");
const { useSyncExternalStore } = require("react");
const { before } = require("node:test");

// const loadContacts = require('./loadContacts');

// console.log(sessions);

// MYSQL connection
// This is where we create our connection to the database using appropriate credentials/database name
// Host Name : "database-chat-app3.ct59e8m8f0qd.us-east-1.rds.amazonaws.com"
// User : "admin"
// Password : "skateboard"
// Database : "chat_application"
// Port : 3306

const db = mysql.createPool({
    host: "database-chat-app.ct59e8m8f0qd.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "skateboard",
    database: "chat_application",
});

app.use(cors()); // Using CORS will allow resources from the front-end to be shared with the back-end
app.use(express.json()); // Uing express will allow app to parse incoming requests with JSON payloads. Will return an object instead.
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); // this allows incoming url requests to be turned into objects as well, not just JSON requests.

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

app.post("/createUser", (req, res) => {
    // This is the route that will be used to create a new user in the database
    const username = req.body.username; // This is the username that will be passed in from the front-end
    const password = req.body.password; // This is the password that will be passed in from the front-end

    // Query the user_login table for a record with the given username
    db.query(
        "SELECT * FROM user_login WHERE username = ?", // This is the query that will be run on the database
        [username], // This is the username that will be passed in from the front-end
        (err, result) => {
            // This is the callback function that will be run after the query is run
            if (err) {
                console.log(err);
                res.send("Error checking for existing username");
                return;
            }

            // If a record with the given username already exists, return an error message
            if (result.length > 0) {
                console.log(result.length);
                res.send("Username already exists");
                return;
            }

            if (
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                    password
                ) === false
            ) {
                res.send("not working");
                return;
            }

            bcrypt.hash(password, 10, (err, hashedPassword) => {
                // This is the function that will hash the password
                if (err) {
                    console.log(err);
                    res.status(500).send("Error hashing password");
                } else {
                    db.query(
                        "INSERT INTO user_login (username, password) VALUES (?, ?)",
                        [username, hashedPassword],
                        (err, result) => {
                            if (err) {
                                console.log(err);
                                res.status(500).send(
                                    "Error inserting new record"
                                );
                                return;
                            }

                            // If the insertion is successful, return a success message
                            res.send("Record Insert Successful");
                        }
                    );
                }
            });
        }
    );
});

app.post("/userLogin", (req, res) => {
    // This is the route that will be used to login a user
    const username = req.body.username; // This is the username that will be passed in from the front-end
    const password = req.body.password;
    // console.log(password);
    // Query the database to find the user with the specified username
    db.query(
        `SELECT * FROM user_login WHERE username = '${username}'`,
        (err, results) => {
            // const user_id = results[0].id;
            // console.log(user_id);
            // console.log(username);

            if (err) {
                // handle error
                return res.status(500).send({
                    error: "Error verifying login credentials",
                });
            }

            if (results.length === 0) {
                // handle incorrect login credentials
                return res
                    .status(401)
                    .send({ error: "Incorrect login credentials!" });
            }

            // Get the hashed password from the database
            // const hashedPassword = results[0].password;
            // console.log(hashedPassword);

            // Use bcrypt.compare to compare the entered password with the hashed password in the database
            bcrypt.compare(password, results[0].password, (err, result) => {
                if (err) {
                    // handle error
                    return res.status.send({
                        error: "Error verifying login credentials",
                    });
                }

                if (result) {
                    const user_id = results[0].id;
                    const username = results[0].username;
                    // console.log(id);
                    // const socketToUser = {};
                    // const socketMap = new Map();
                    // console.log(socketToUser);
                    const token = jwt.sign({ username }, "jwtSecret", {
                        expiresIn: 300,
                    });

                    res.status(200).send({
                        message: "Login successful",
                        auth: true,
                        token: token,
                        userID: username,
                    });
                } else {
                    res.json({
                        auth: false,
                        message: "no user exists",
                    });
                }
            });
        }
    );
});

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        res.send("yo i need a token");
    } else {
        jwt.verify(token, "jwtSecret", (err, decode) => {
            // console.log(decode);
            if (err) {
                res.json({
                    auth: false,
                    message: " lol you failed to authenticate",
                });
            } else
                res.json({
                    auth: true,
                    decodedJWT: decode,
                });
        });
    }
};

const verifyJWTS = (token) => {
    try {
        jwt.verify(token, "jwtSecret");
        return true;
    } catch (error) {
        return false;
    }
};

app.get("/UserPage", verifyJWT, (req, res) => {
    res.json({
        auth: true,
        decodedJWT: req.decodedJWT,
    });
});

io.on("connection", (socket) => {
    const token = socket.handshake.query.token;
    if (verifyJWTS(token)) {
        console.log(socket.id);
        console.log("you are connected");
    } else {
        console.log("you are disconnected");
        socket.disconnect();
        return;
    }

    const socket_id = socket.id;
    console.log(socket_id);

    socket.on("send_message", (data, res) => {
        console.log(data);

        db.query(
            // purpose of this query is to get the user_id from the user_login table
            `SELECT username, id FROM user_login WHERE username = '${data.userInfo.sender_id}'`,
            (err, results) => {
                console.log(results);

                const sender_id = results[0].id;

                db.query(
                    "INSERT INTO message (user_id, Message, Sent_Date_Time, Recipient_ID) VALUES (?, ?, ?, ?)",
                    [
                        sender_id,
                        data.userInfo.message,
                        data.userInfo.time,
                        data.userInfo.recepient_id,
                    ],
                    (err, result) => {
                        console.log(result);
                        if (err) {
                            console.log(err);
                            res.status(500).send("Error inserting new record");

                            return;
                        }
                    }
                );
            }
        );
        // io.to(socketConnection[key]).emit("new message", data.message);
    });
});

// io.on("connection", (socket) => {
//     console.log(socket.id);
//     // socket.on("send_username", (username) => {
//     //     socket.broadcast.emit("receive_username", username);
//     // });

//     socket.on("send_message", (data, res) => {
//         console.log(data);

//         db.query(
//             // purpose of this query is to get the user_id from the user_login table
//             `SELECT username, id FROM user_login WHERE username = '${data.username}'`,
//             (err, results) => {
//                 console.log(results);

//                 const user_id = results[0].id;
//                 if (err) {
//                     // handle error
//                     return res.status(500).send({
//                         error: "Username not found",
//                     });
//                 }

//                 db.query(
//                     "INSERT INTO message (user_id, Message, Sent_Date_Time) VALUES (?, ?, ?)",
//                     [user_id, data.message, data.time],
//                     (err, result) => {
//                         if (err) {
//                             console.log(err);
//                             res.status(500).send("Error inserting new record");
//                             return;
//                         }
//                         // console.log(result);
//                     }
//                 );
//             }
//         );
//         io.to(data.recepient_id).emit("new message", data.message);
//     });
// });

// socket.on('send message', (data) => {
//   // Forward the message to the recipient
//   io.to(data.recipientId).emit('new message', data.message);
// });
app.post("/loadContacts", (req, res) => {
    console.log(req.body.username);
    // We will use this user name to make a query that will get the messages that this user has talked to before. If the messages exist proced with the rest which is getting the user that will be used to populate the list and their messages
    res.send("Here we send the list of users that are friends");
    res.send(
        "we will also make a query here based on the users ids/username to load their messages"
    );
});

app.post("/addContact", (req, res) => {
    const username = req.body.contact_username;
    // const user_id = req.body.user_id;
    // Query the database to find the user with the specified username
    db.query(
        `SELECT username, id FROM user_login WHERE username = '${username}'`,
        (err, results) => {
            // const recepient_id = results[0].id;
            // console.log(recepient_id);

            if (err) {
                // handle error
                return res.status(500).send({
                    error: "Error adding contact",
                });
            }

            if (results.length === 0) {
                // handle incorrect login credentials
                return res.send({ error: "This user does not exist" });
            }

            const username = results[0].username;
            console.log(results);

            res.status(200).send({
                message: "Added contact successfully",
                userName: username,
                recepient_id: results[0].id,
            });
        }
    );
});

// Airplay occupies the port 5000 for sending and receiving requests!!!
// App awaits to be started in port 5000. Remember if you are on mac OS, turn off receiving for AirPlay
server.listen(5000, () => {
    console.log("Server is running on port 5000");
});

// db.query(
//     "INSERT INTO message (user_id, Message, Sent_Date_Time) VALUES (?, ?, ?)",
//     [user_id, data.message, data.time],
//     (err, result) => {
//         if (err) {
//             console.log(err);
//             res.status(500).send("Error inserting new record");
//             return;
//         }
//         // console.log(result);
//     }
// );

// socket.on("send_message", (data, res) => {
//     console.log(data);

//     db.query(
//         // purpose of this query is to get the user_id from the user_login table
//         `SELECT username, id FROM user_login WHERE username = '${data.username}'`,
//         (err, results) => {
//             console.log(results);

//             const user_id = results[0].id;
//             if (err) {
//                 // handle error
//                 return res.status(500).send({
//                     error: "Username not found",
//                 });
//             }

//         }
//     );
//     io.to(data.recepient_id).emit("new message", data.message);
// });

// I wanted to export this function but i could not get it to export properly the end points are currently working. This get request is supposed to get all the
// users messages and based on the messages get the friends list and by default itll also get some messages
