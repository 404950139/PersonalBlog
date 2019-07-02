// 每日一句
var everyDay = new Vue({
    el: '#every_day',
    data: {
        content: ''
    },
    created: function () {
        axios({
            method: "get",
            url: "/queryEveryDay"
        }).then(res => {
            this.content = res.data.data[0].content;
        }).catch(function (res) {
            console.log("请求失败");
        });
    }
});

// 文章列表
var articleList = new Vue({
    el: '#article_list',
    data: {
        article_list: [],
        page: 1,
        pageSize: 5,
        count: '',
        pageNumList: ''
    },
    methods: {
        formatDate: function (now) {
            var cNow = new Date(now)
            return cNow.getFullYear() + "-" + cNow.getMonth() + 1 + "-" + cNow.getDate();
        }
    },
    computed: {
        jumpTo: function () {
            return function (page) {
                this.getPage(page, this.pageSize);
            }
        },
        getBlogCount: function () {
            axios({
                method: "get",
                url: "/queryBlogCount"
            }).then(res => {
                this.count = res.data.data[0].allCount;
                this.getPage(this.page, this.pageSize);
            }).catch(rej => {
                console.log("未查询到总条数");
            })
        },
        getPage: function () {
            return function (page, pageSize) {

                axios({
                    method: "get",
                    url: "/queryBlogByPage?page=" + (page - 1) + "&pageSize=" + pageSize
                }).then(res => {
                    var result = res.data.data;
                    for (var i = 0; i < result.length; i++) {
                        result[i].ctime = this.formatDate(result[i].ctime * 1000);
                        result[i].tags = result[i].tags.replace(/\，/g, " ");
                        result[i].link = "/blog_detail.html?bid=" + result[i].id;
                    }
                    this.article_list = result;
                    this.page = page;
                }).catch(function (rej) {
                    console.log("请求错误");
                });
                this.generatePageTool;
            }
        },
        // 翻页
        generatePageTool: function () {
            var nowPage = this.page;
            var pageSize = this.pageSize;
            var totalCount = this.count;
            var result = [];
            result.push({ text: "<<", page: 1 });
            if (nowPage > 2) {
                result.push({ text: nowPage - 2, page: nowPage - 2 });
            }
            if (nowPage > 1) {
                result.push({ text: nowPage - 1, page: nowPage - 1 });
            }
            result.push({ text: nowPage, page: nowPage });
            // (100 + 5) / 6
            if (nowPage + 1 <= Math.ceil(totalCount / pageSize)) {
                result.push({ text: nowPage + 1, page: nowPage + 1 });
            }
            if (nowPage + 2 <= Math.ceil(totalCount / pageSize)) {
                result.push({ text: nowPage + 2, page: nowPage + 2 });
            }
            result.push({ text: ">>", page: Math.ceil(totalCount / pageSize) });
            this.pageNumList = result;
            return result;
        }
    },
    created: function () {
        var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
        if (searchUrlParams == "") {
            this.getBlogCount;
        } else {
            var bid = searchUrlParams[0].split("=")[1];
            axios({
                method: "get",
                url: "/queryTagIdByTag?bid=" + bid
            }).then(res => {
                var result = res.data.data;
                for (var i = 0; i < result.length; i++) {
                    result[i].ctime = this.formatDate(result[i].ctime * 1000);
                    result[i].tags = result[i].tags.replace(/\，/g, " ");
                    result[i].link = "/blog_detail.html?bid=" + result[i].id;
                }
                this.article_list = result;
                this.page = page;
            }).catch(rej => {
                console.log("查询失败");
            });
        }
    }
});