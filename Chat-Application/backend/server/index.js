const express = require("express"); // Node JS web app framework. Primarily back end focused, for building REST API.
const app = express();
const bodyParser = require("body-parser"); // NPM package that parses incoming request bodies in a middleware before you handle it.
const mysql = require("mysql2"); // Installs mysql library. Enables us to "createPool" a connection to the server in backend (MYSQL WB)
const cors = require("cors"); // Cross-Origin-Resource-Sharing; protocol that defines sharing resources of different origins. client/server architecture.
const bcrypt = require("bcrypt");

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
app.use(bodyParser.urlencoded({ extended: true })); // this allows incoming url requests to be turned into objects as well, not just JSON requests.

app.post("/createUser", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Query the user_login table for a record with the given username
    db.query(
        "SELECT * FROM user_login WHERE username = ?",
        [username],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error checking for existing username");
                return;
            }

            // If a record with the given username already exists, return an error message
            if (result.length > 0) {
                console.log(result.length);
                res.status(400).send("Username already exists");
                return;
            }

            bcrypt.hash(password, 10, (err, hashedPassword) => {
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
    const username = req.body.username;
    const password = req.body.password;
    console.log(username);
    console.log(password);

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error hashing password");
        } else {
            db.query(
                `SELECT * FROM user_login WHERE username = '${username}' AND password = '${hashedPassword}}'`,
                (error, results, fields) => {
                    console.log(hashedPassword);
                    if (error) {
                        // handle error
                        return res.status(500).send({
                            error: "Error verifying login credentials",
                        });
                    }

                    if (results.length === 0) {
                        // handle incorrect login credentials
                        return res
                            .status(401)
                            .send({ error: "Incorrect login credentials" });
                    }

                    // handle successful login
                    return res
                        .status(200)
                        .send({ message: "Login successful" });
                }
            );
        }
    });
});

// Airplay occupies the port 5000 for sending and receiving requests!!!
// App awaits to be started in port 5000. Remember if you are on mac OS, turn off receiving for AirPlay

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
