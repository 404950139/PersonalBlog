var mysql = require("mysql");

function createConnection() {
    var connection = mysql.createConnection({
        host: "39.108.104.92",
        port: "3306",
        user: "www_nixingdongma",
        password: "cNFZAcLZddkk8Tx8",
        database: "www_nixingdongma"
    })
    return connection;
}

module.exports.createConnection = createConnection;