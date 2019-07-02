var blogList = new Vue({
    el: "#blog_list",
    data: {
        blogs: []
    },
    computed: {

    },
    created: function () {
        axios({
            method: "get",
            url: "/queryAllBlog"
        }).then( res => {
            var result = res.data.data;
            for (var i = 0 ; i < result.length ; i ++) {
                result[i].link = "/blog_detail.html?bid=" + result[i].id;
            }
            this.blogs = result;
        }).catch( rej => {
            console.log("查询失败");
        });
    },
});