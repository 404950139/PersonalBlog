var blogDetail = new Vue({
    el: "#blog_detail",
    data: {
        title: "",
        content: "",
        ctime: "",
        tags: "",
        views: ""
    },
    computed: {

    },
    created: function () {
        var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
        if (searchUrlParams == "") {
            return;
        }
        var bid = -1;
        for (var i = 0; i < searchUrlParams.length; i++) {
            if (searchUrlParams[i].split("=")[0] == "bid") {
                try {
                    bid = parseInt(searchUrlParams[i].split("=")[1]);
                } catch (e) {
                    console.log(e);
                }
            }
        }
        axios({
            method: "get",
            url: "/queryBlogById?bid=" + bid
        }).then(res => {
            var result = res.data.data[0];
            this.title = result.title;
            this.content = result.content;
            this.ctime = result.ctime;
            this.tags = result.tags;
            this.views = result.views;
        }).catch(function (rej) {
            console.log("请求失败");
        })
    }
});


var sendComment = new Vue({
    el: "#send_comment",
    data: {
        vFcode: '',
        rightCode: ""
    },
    computed: {
        sendComment: function () {
            return function () {
                var code = document.getElementById("comment_code").value.toLowerCase();
                if (code != sendComment.rightCode ) {
                    alert("验证码不正确");
                    return;
                }
                var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
                if (searchUrlParams == "") {
                    return;
                }
                var bid = -1;
                for (var i = 0; i < searchUrlParams.length; i++) {
                    if (searchUrlParams[i].split("=")[0] == "bid") {
                        try {
                            bid = parseInt(searchUrlParams[i].split("=")[1]);
                        } catch (e) {
                            console.log(e);
                        }
                    }
                };
                var reply_name = document.getElementById("comment_reply_name").value;
                var reply = document.getElementById("comment_parent").value;
                var name = document.getElementById("comment_name").value;
                var email = document.getElementById("comment_email").value;
                var content = document.getElementById("comment_content").value;

                axios({
                    method: "get",
                    url: "/addComment?bid=" + bid + "&parent=" + reply + "&userName=" + name + "&email=" + email + "&content=" + content + "&reply_name=" + reply_name,
                }).then(function (res) {
                    alert("评论成功");
                }).catch(function (rej) {
                    console.log("评论失败");
                })
            }
        },
        changeCode: function () {
            return function () {
                axios({
                    method: "get",
                    url: "/queryRandomCode",
                }).then( res => {
                    this.vFcode = res.data.data.data;
                    this.rightCode = res.data.data.text.toLowerCase();
                }).catch(function (rej) {
                    console.log(rej);
                })
            }
        }
    },
    created: function () {
        this.changeCode();
    }
});

var blogComments = new Vue({
    el: "#blog_comments",
    data: {
        total: 0,
        comments: []
    },
    computed: {
        reply: function () {
            return function (commentId, userName) {
                document.getElementById("comment_parent").value = commentId;
                document.getElementById("comment_reply_name").value = userName;
                location.href = "#send_comment";
            }
        }
    },
    created: function () {
        var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
        if (searchUrlParams == "") {
            return;
        }
        var bid = -1;
        for (var i = 0; i < searchUrlParams.length; i++) {
            if (searchUrlParams[i].split("=")[0] == "bid") {
                try {
                    bid = parseInt(searchUrlParams[i].split("=")[1]);
                } catch (e) {
                    console.log(e);
                }
            }
        }
        axios({
            method: "get",
            url: "/queryBlogCommentById?bid=" + bid
        }).then( res => {
            this.comments = res.data.data;
            this.total = res.data.data.length;
            for (var i = 0 ; i < this.comments.length ; i ++) {
                if (this.comments[i].parent > -1) {
                    this.comments[i].options = "回复@" + this.comments[i].parent_name;
                }
            }
        }).catch(function (rej) {
            console.log(rej);
        });
    }
});