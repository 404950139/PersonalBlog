var dbUtil = require("./dbUtil");

function queryTag(tag, success) {
    var insertSql = "select * from blog_tags where tag = ?";
    var params = [tag];

    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
};

function insertTag(tag, utime, ctime, success) {
    var insertSql = "insert into blog_tags (`tag`, `ctime`, `utime`) value (?, ?, ?)";
    var params = [tag, ctime, utime];

    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
};

function queryAllTag(success) {
    var insertSql = "select * from blog_tags";
    var params = [];

    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
};

module.exports.insertTag = insertTag;
module.exports.queryTag = queryTag;
module.exports.queryAllTag = queryAllTag;
