var insertEveryDay = require("../dao/everyDay");
var timeUtil = require("../util/timeUtil");
var writeResult = require("../util/respUtil");

var path = new Map();

function editEveryDay(request, response) {
    request.on("data", function(data) {
        insertEveryDay.insertEveryDay(data.toString().trim(), timeUtil.getNow(), function (result) {
            response.writeHead(200);
            response.write(writeResult.writeResult("success", "添加成功", null));
            response.end();
        });
    });
};

path.set('editEveryDay', editEveryDay);

function queryEveryDay(request, response) {
    insertEveryDay.queryEveryDay(function (result) {
        response.writeHead(200);
        response.write(writeResult.writeResult("success", "添加成功", result));
        response.end();
    });
}

path.set('queryEveryDay', queryEveryDay);

module.exports.path = path;