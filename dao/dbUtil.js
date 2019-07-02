var mysql = require("mysql");

function createConnection() {
    var connection = mysql.createConnection({
        host: "120.43.96.239",
        port: "3306",
        user: "root",
        password: "shi1505223675",
        database: "blog"
    })
    return connection;
}

module.exports.createConnection = createConnection;