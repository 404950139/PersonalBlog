var dbUtil = require("./dbUtil");

function insertBlog(title, content, views, tags, utime, ctime, success) {
    var insertSql = "insert into blog_article (`title`, `content`, `views`, `tags`, `ctime`, `utime`) value (?, ?, ?, ?, ?, ?)";
    var params = [title, content, views, tags, ctime, utime];

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

function queryBlogByPage(page, pageSize, success) {
    var insertSql = "select * from blog_article order by id desc limit ?, ?";
    var params = [page * pageSize, pageSize];

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

function queryBlogCount(success) {
    var insertSql = "select count(*) as `allCount` from blog_article";
    var params = [];
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

function queryBlogById(id, success) {
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
    })
};

function queryAllBlog(success) {
    var insertSql = "select id, title from blog_article";
    var params = [];
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

function addViews(id, success) {
    var insertSql = "update blog_article set views = views + 1 where id = ?";
    var params = [id];
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

function queryHotBlog(size, success) {
    var insertSql = "select id, title from blog_article order by id desc limit ?";
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

function queryBlogByTagId(tag, success) {
    var insertSql = "select article_id from article_tags_mapping where tag_id = ?";
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





module.exports.insertBlog = insertBlog;
module.exports.queryBlogByPage = queryBlogByPage;
module.exports.queryBlogCount = queryBlogCount;
module.exports.queryBlogById = queryBlogById;
module.exports.queryAllBlog = queryAllBlog;
module.exports.addViews = addViews;
module.exports.queryHotBlog = queryHotBlog;
module.exports.queryBlogByTagId = queryBlogByTagId;