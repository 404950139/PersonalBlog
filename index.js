var express = require("express");

var globalConfig = require("./config");

var loader = require("./loader");

var app = new express();

app.post("/editEveryDay", loader.get("editEveryDay"));
app.get("/queryEveryDay", loader.get("queryEveryDay"));
app.post("/editBlog", loader.get("editBlog"));
app.get("/queryBlogByPage", loader.get("queryBlogByPage"));
app.get("/queryBlogCount", loader.get("queryBlogCount"));
app.get("/queryBlogById", loader.get("queryBlogById"));
app.get("/addComment", loader.get("addComment"));
app.get("/queryRandomCode", loader.get("queryRandomCode"));
app.get("/queryBlogCommentById", loader.get("queryBlogCommentById"));
app.get("/queryAllBlog", loader.get("queryAllBlog"));
app.get("/queryRandomTags", loader.get("queryRandomTags"));
app.get("/queryHotBlog", loader.get("queryHotBlog"));
app.get("/queryNewComment", loader.get("queryNewComment"));
app.get("/queryTagIdByTag", loader.get("queryTagIdByTag"));


// 设置静态文件位置
app.use(express.static("./page/"));

app.listen(12306, function () {
    console.log("服务器已启动");
});