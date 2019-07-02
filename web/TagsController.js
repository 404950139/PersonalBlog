var insertBlog = require("../dao/editBlog");
var timeUtil = require("../util/timeUtil");
var writeResult = require("../util/respUtil");
var tagDao = require("../dao/tagDao");
var tagBlogMapping = require("../dao/tagBlogMapping");
var qs = require("qs");
var url = require("url");

var path = new Map();

function queryRandomTags(request, response) {
    tagDao.queryAllTag(function (result) {
        result.sort(function () {
            return Math.random() > 0.5 ? true : false;
        });
        response.writeHead(200);
        response.write(writeResult.writeResult("success", "查询成功", result));
        response.end();
    });
};


function queryTagIdByTag(request, response) {
    var params = url.parse(request.url, true).query;
    tagBlogMapping.queryTagIdByTag(params.bid, res => {
        insertBlog.queryBlogByTagId(parseInt(res[0].id), function (lastResult) {
            tagBlogMapping.queryBlogByBlogId(parseInt(lastResult[0].article_id), function (outResult) {
                response.writeHead(200);
                response.write(writeResult.writeResult("success", "查询成功", outResult));
                response.end();
            });
        });
    });
};


path.set("queryTagIdByTag", queryTagIdByTag);

path.set("queryRandomTags", queryRandomTags);

module.exports.path = path;
