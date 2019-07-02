var dbUtil = require("./dbUtil");

function insertComment(articleId, parent, userName, email, comments, reply_name, ctime, utime, success) {
    var insertSql = "insert into blog_comments (`article_Id`, `parent`, `parent_name`, `user_name`, `comments`, `email`, `ctime`, `utime`) value (?, ?, ?, ?, ?, ?, ?, ?)";
    var params = [articleId, parent, reply_name, userName, comments, email, ctime, utime];

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

function queryCommentByBlogId(blogId, success) {
    var insertSql = "select * from blog_comments where article_id = ?";
    var params = [blogId];

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

function queryNewComment(size, success) {
    var insertSql = "select id, user_name, comments, ctime from blog_comments order by id desc limit ?";
    var params = [size];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    })
};


module.exports.insertComment = insertComment;
module.exports.queryCommentByBlogId = queryCommentByBlogId;
module.exports.queryNewComment = queryNewComment;