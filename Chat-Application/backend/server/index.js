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

app.post("/createUser", (req, res) => { // This is the route that will be used to create a new user in the database
    const username = req.body.username; // This is the username that will be passed in from the front-end
    const password = req.body.password; // This is the password that will be passed in from the front-end

    // Query the user_login table for a record with the given username
    db.query( 
        "SELECT * FROM user_login WHERE username = ?",  // This is the query that will be run on the database
        [username], // This is the username that will be passed in from the front-end
        (err, result) => { // This is the callback function that will be run after the query is run
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

            bcrypt.hash(password, 10, (err, hashedPassword) => {  // This is the function that will hash the password
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


app.post("/userLogin", (req, res) => {  // This is the route that will be used to login a user
    const username = req.body.username;     // This is the username that will be passed in from the front-end
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
                    const id = results[0].id;
                    const username = results[0].username;
                    console.log(id);
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

app.get("/UserPage", verifyJWT, (req, res) => {
    res.json({
        auth: true,
        decodedJWT: req.decodedJWT,
    });
});

io.on("connection", (socket) => {
    console.log(socket.id);
    // socket.on("send_username", (username) => {
    //     socket.broadcast.emit("receive_username", username);
    // });

    socket.on("send_message", (data, res) => {
        console.log(data);

        db.query(  // purpose of this query is to get the user_id from the user_login table
            `SELECT username, id FROM user_login WHERE username = '${data.username}'`,
            (err, results) => {
                console.log(results);

                const user_id = results[0].id;
                if (err) {
                    // handle error
                    return res.status(500).send({
                        error: "Username not found",
                    });
                }

                db.query(
                    "INSERT INTO message (user_id, Message, Sent_Date_Time) VALUES (?, ?, ?)",
                    [user_id, data.message, data.time],
                    (err, result) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send("Error inserting new record");
                            return;
                        }
                        // console.log(result);
                    }
                );
                socket.broadcast.emit("receive_message", data);
            }
        );
    });
});


  
    // socket.on('send message', (data) => {
    //   // Forward the message to the recipient
    //   io.to(data.recipientId).emit('new message', data.message);
    // });

    
app.post("/addContact", (req, res) => {
    const username = req.body.contact_username;
    // const user_id = req.body.user_id;
    // Query the database to find the user with the specified username
    db.query(
        `SELECT username, id FROM user_login WHERE username = '${username}'`,
        (err, results) => {

            const recepient_id = results[0].id;
            console.log(recepient_id);

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

            res.status(200).send({
                message: "Added contact successfully",
                userName: username,
            });
        }
    );
});








// Airplay occupies the port 5000 for sending and receiving requests!!!
// App awaits to be started in port 5000. Remember if you are on mac OS, turn off receiving for AirPlay
server.listen(5000, () => {
    console.log("Server is running on port 5000");
});

