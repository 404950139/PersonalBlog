var dbUtil = require("./dbUtil");

function insertTagBlogMapping(tagId, blogId, utime, ctime, success) {
    var insertSql = "insert into article_tags_mapping (`tag_id`, `article_id`, `ctime`, `utime`) value (?, ?, ?, ?)";
    var params = [tagId, blogId, ctime, utime];

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

function queryBlogByTag(id, success) {
    var insertSql = "select article_id from article_tags_mapping where id = ?";
    var params = [id];

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

function queryTagIdByTag(tag, success) {
    var insertSql = "select id from blog_tags where tag = ?";
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

function queryBlogByBlogId(id, success) {
    var insertSql = "select * from blog_article where id = ?";
    var params = [id];

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



module.exports.queryBlogByBlogId = queryBlogByBlogId;


module.exports.queryTagIdByTag = queryTagIdByTag;


module.exports.insertTagBlogMapping = insertTagBlogMapping;