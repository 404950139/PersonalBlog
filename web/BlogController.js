var insertBlog = require("../dao/editBlog");
var timeUtil = require("../util/timeUtil");
var writeResult = require("../util/respUtil");
var tagDao = require("../dao/tagDao");
var tagBlogMapping = require("../dao/tagBlogMapping");
var qs = require("qs");
var url = require("url");

var path = new Map();

// 修改博客
function editBlog(request, response) {
    request.on("data", function(data) {
        var qsData = qs.parse(data.toString());
        insertBlog.insertBlog(qsData.title, qsData.content, 0, qsData.tags, timeUtil.getNow(), timeUtil.getNow(), function (result) {
            response.writeHead(200);
            response.write(writeResult.writeResult("success", "添加成功", null));
            response.end();
            var blogId = result.insertId;
            var tags = qsData.tags.replace(/\s+/g, "").replace(/\，/g, ",");
            var tagList = tags.split(",");
            for (var i = 0 ; i < tagList.length ; i ++) {
                if (tagList[i] == '') {
                    continue;
                }
                queryTag(tagList[i], blogId);
            }
        });
    });
};

function queryBlogById(request, response) {
    var params = url.parse(request.url, true).query;
    insertBlog.queryBlogById(parseInt(params.bid), function (result) {
        // 增加浏览次数
        insertBlog.addViews(params.bid, res => {
            response.writeHead(200);
            response.write(writeResult.writeResult("success", "查询成功", result));
            response.end();
        });
    })
};


function queryBlogByPage(request, response) {
    // true 解析成对象的形式
    var params = url.parse(request.url, true).query;
    insertBlog.queryBlogByPage(parseInt(params.page), parseInt(params.pageSize), function (result) {
        for (var i = 0 ; i < result.length ; i ++) {
            // result[i].content = result[i].content.replace(/<img[\w\W]*">/, "");
            // result[i].content = result[i].content.replace(/<[\w\W]{1,5}>/g, "");
            result[i].content = result[i].content.substring(0, 300);
        }
        response.writeHead(200);
        response.write(writeResult.writeResult("success", "查询成功", result));
        response.end();
    });
};


function queryTag (tag, blogId) {
    tagDao.queryTag(tag, function (result) {
        // 判断数据库中有没有这个tag
        if (result == null || result.length == 0) {
            insertTag(tag, blogId);
        } else {
            // 如果有就返回查询结果，返回的是一个数组
            insertTagBlogMapping(result[0].id, blogId, timeUtil.getNow(), timeUtil.getNow());
        }
    });
};

function insertTag (tag, blogId) {
    tagDao.insertTag(tag, timeUtil.getNow(), timeUtil.getNow(), function (result) {
        insertTagBlogMapping(result.insertId, blogId);
    });
};

function insertTagBlogMapping(tagId, blogId) {
    tagBlogMapping.insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow(), function () {

    });
};


function queryBlogCount(request, response) {
    insertBlog.queryBlogCount(function (result) {
        response.writeHead(200);
        response.write(writeResult.writeResult("success", "查询成功", result));
        response.end();
    })
};

function queryAllBlog(request, response) {
    insertBlog.queryAllBlog(function (result) {
        response.writeHead(200);
        response.write(writeResult.writeResult("success", "查询成功", result));
        response.end();
    });
};

function queryHotBlog(request, response) {
    insertBlog.queryHotBlog(5, function (result) {
        response.writeHead(200);
        response.write(writeResult.writeResult("success", "查询成功", result));
        response.end();
    });
};

path.set('editBlog', editBlog);
path.set('queryBlogByPage', queryBlogByPage);
path.set('queryBlogCount', queryBlogCount);
path.set('queryBlogById', queryBlogById);
path.set('queryAllBlog', queryAllBlog);
path.set('queryHotBlog', queryHotBlog);

module.exports.path = path;