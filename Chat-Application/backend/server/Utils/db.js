const mysql = require("mysql2");

const db = mysql.createPool({
    host: "database-chat-app.ct59e8m8f0qd.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "skateboard",
    database: "chat_application",
});

module.exports = db;