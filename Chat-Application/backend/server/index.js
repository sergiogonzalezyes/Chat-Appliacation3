const express = require("express"); // Node JS web app framework. Primarily back end focused, for building REST API.
const app = express();
const bodyParser = require("body-parser"); // NPM package that parses incoming request bodies in a middleware before you handle it. 
const mysql = require("mysql2"); // Installs mysql library. Enables us to "createPool" a connection to the server in backend (MYSQL WB)
const cors = require("cors"); // Cross-Origin-Resource-Sharing; protocol that defines sharing resources of different origins. client/server architecture. 


// MYSQL connection
// This is where we create our connection to the database using appropriate credentials/database name
// Host Name : "database-chat-app3.ct59e8m8f0qd.us-east-1.rds.amazonaws.com"
// User : "admin"
// Password : "skateboard"
// Database : "node_twitterclone"
// Port : 3306

const db = mysql.createPool({
    host: "database-chat-app3.ct59e8m8f0qd.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "skateboard",
    database: "node_twitterclone"
});

app.use(cors()); // Using CORS will allow resources from the front-end to be shared with the back-end
app.use(express.json()); // Uing express will allow app to parse incoming requests with JSON payloads. Will return an object instead. 
app.use(bodyParser.urlencoded({extended: true})); // this allows incoming url requests to be turned into objects as well, not just JSON requests. 

// app.get("path") will for GET method which grabs data from backend. for any other function, use app.use("path"), for multiple callbacks use app.all()
// app.use() only takes one path and will only see whether url starts with specified path. app.all() will match the complete path.
app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM user_login"; // Selects all from contact_db table in mysql database.
    db.query(sqlGet, (error, result) => {
        var contact_info = result; // store the response into variable that will be used for manipulation in react app.
        res.send(contact_info) // return response from database
    });
}); 

// Insert into DB table contact_db tested and works 
// app.get("/", (req, res) => {
//     const sqlInsert = "INSERT INTO contact_db (name, email, contact) VALUES ('beans', 'beans@gmail.com', 'beansiii')"; // These are hardcoded paramaeters that will be inserted into table when page is refreshed or opened. 
//     db.query(sqlInsert, (error, result) => {
//         console.log("error", error);
//         console.log("result", result);
//         res.send("Hello Express");
//     });
// });


 // Airplay occupies the port 5000 for sending and receiving requests!!!
 // App awaits to be started in port 5000. Remember if you are on mac OS, turn off receiving for AirPlay

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});