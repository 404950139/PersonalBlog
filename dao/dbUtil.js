var mysql = require("mysql");

function createConnection() {
    var connection = mysql.createConnection({
        host: "localhost",
        port: "3306",
        user: "www_nixingdongma",
        password: "cNFZAcLZddkk8Tx8",
        database: "www_nixingdongma"
    })
    return connection;
}

module.exports.createConnection = createConnection;