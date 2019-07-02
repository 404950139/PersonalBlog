var insertBlog = require("../dao/editBlog");
var timeUtil = require("../util/timeUtil");
var writeResult = require("../util/respUtil");
var tagDao = require("../dao/tagDao");
var tagBlogMapping = require("../dao/tagBlogMapping");
var qs = require("qs");
var url = require("url");
var captcha = require("svg-captcha");
var commentDao = require("../dao/commentDao");


var path = new Map();
function addComment(request, response) {
    var params = url.parse(request.url, true).query;
    commentDao.insertComment(parseInt(params.bid), parseInt(params.parent), params.userName, params.email, params.content, params.reply_name, timeUtil.getNow(), timeUtil.getNow(), function (result) {
        response.writeHead(200);
        response.write(writeResult.writeResult("success", "评论成功", null));
        response.end();
    });
};

path.set("addComment", addComment);

function queryRandomCode(request, response) {
    var img = captcha.create({
        fontSize: 50,
        width: 100,
        height: 34
    });
    response.writeHead(200);
    response.write(writeResult.writeResult("success", "success", img));
    response.end();
};

path.set("queryRandomCode", queryRandomCode);

function queryBlogCommentById(request, response) {
    var params = url.parse(request.url, true).query;
    commentDao.queryCommentByBlogId(parseInt(params.bid), function (result) {
        response.writeHead(200);
        response.write(writeResult.writeResult("success", "查询成功", result));
        response.end();
    });
};

path.set("queryBlogCommentById", queryBlogCommentById);

function queryNewComment(request, response) {
    commentDao.queryNewComment(5, function (result) {
        response.writeHead(200);
        response.write(writeResult.writeResult("success", "查询成功", result));
        response.end();
    });
};

path.set("queryNewComment", queryNewComment);

module.exports.path = path;