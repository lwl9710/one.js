module.exports = {
    baseUrl: "/user",
    list: [
        {
            path: "/demo1",
            sql: "",    //定义sql时以sql数据返回为主
            method: "GET",
            data: {
                name: "小明",
                sex: "男",
                age: 23
            }
        },
        {
            path: "/sys",
            sql: "",
            method: "GET",
            data: [
                1,
                2,
                3,
                4,
                5
            ]
        }
    ]
}