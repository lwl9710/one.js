module.exports = {
    baseUrl: "/user",   //配置基本路径 不配置时默认根路径
    list: [
        // {
        //     path: "/demo",  //配置请求路径
        //     sql: "select * from user",    //定义sql时以sql数据返回为主
        //     sqlParam: [],   //sql参数
        //     method: "all",  //配置请求方式
        //     data: "666"
        // },
        {
            path: "/sys",
            method: "get",
            data: "Hello one.js"
        }
    ]
}