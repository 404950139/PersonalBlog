var dbUtil = require("./dbUtil");

function insertEveryDay(content, ctime, success) {
    var insertSql = "insert into blog_sentence (`content`, `ctime`) value (?, ?)";
    var params = [content, ctime];

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

function queryEveryDay(success) {
    var insertSql = "select * from blog_sentence order by id desc limit 1";
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

module.exports.insertEveryDay = insertEveryDay;
module.exports.queryEveryDay = queryEveryDay;