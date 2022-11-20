const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");


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

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// Read all data from contact_db table where id is equal to 5
app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM contact_db";
    db.query(sqlGet, (error, result) => {
        var contact_info = result;
        // comment out 27,28,29 and comment in 25 to see jSON data
        res.send(contact_info)

        // res.send("name: " + contact_info["name"] + ["<br>"]
        // + "email: " + contact_info["email"] + ["<br>"] 
        // + "contact: " + contact_info["contact"]); 
    });
}); 

// Insert into DB table contact_db tested and works 
// app.get("/", (req, res) => {
//     const sqlInsert = "INSERT INTO contact_db (name, email, contact) VALUES ('beans', 'beans@gmail.com', 'beansiii')";
//     db.query(sqlInsert, (error, result) => {
//         console.log("error", error);
//         console.log("result", result);
//         res.send("Hello Express");
//     });
// });


// DELETE FROM `node_twitterclone`.`contact_db` WHERE (`id` = '13');

app.get("/", (req, res) => {
    const sqlGet = "DELETE FROM contact_db WHERE 'id' = '13'";
    db.query(sqlGet, (error, result) => {
        
        console.log("error", error);
        console.log("result", result);
        res.send("Hello Express");
    });
});


app.listen(5000, () => {
    console.log("Server is running on port 5000");
});