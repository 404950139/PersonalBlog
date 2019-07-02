// 随即标签云
var random_tags = new Vue({
    el: '#random_tags',
    data: {
        tags: []
    },
    computed: {
        randomColor: function () {
            return function () {
                var red = Math.random() * 255 + 50,
                    green = Math.random() * 255,
                    blue = Math.random() * 255;
                return "rgb(" + red + "," + green + "," + blue + ")";
            }
        },
        randomSize: function () {
            return function () {
                return Math.random() * 30 + 15 + "px";
            }
        }
    },
    created: function () {
        // 获取随机标签
        axios({
            method: "get",
            url: "/queryRandomTags"
        }).then( res => {
            let result = res.data.data;
            for (var i = 0 ; i < result.length ; i ++) {
                result[i].link = "/index.html?bid=" + result[i].tag;
            };
            this.tags = result;
        }).catch( rej => {
            console.log("查找失败");
        });
    }
});
// 最新热点
var newHot = new Vue({
    el: '#new_hot',
    data: {
        titleList: []
    },
    created: function () {
        axios({
            method: "get",
            url: "/queryHotBlog"
        }).then( res => {
            let result = res.data.data;
            for (let i = 0 ; i < result.length ; i ++) {
                result[i].link = "/blog_detail.html?bid=" + result[i].id;
            };
            this.titleList = result;
        }).catch( rej => {
            console.log("查询失败");
        });
    }
});

// 最新评论
var newComments = new Vue({
    el: '#new_comments',
    data: {
        commentList: []
    },
    created: function () {
        axios({
            method: "get",
            url: "/queryNewComment"
        }).then( res => {
            this.commentList = res.data.data;
        }).catch( rej => {
            console.log("查询失败");
        });
    }
});