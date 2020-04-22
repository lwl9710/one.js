const mysql = require("mysql");
const ServerConfig = require("../config/server.one.config");
const pool = null;
if(ServerConfig.mysql) {
    pool = mysql.createPool({
        host: ServerConfig.mysql.host,
        port: ServerConfig.mysql.port,
        user: ServerConfig.mysql.user,
        password: ServerConfig.mysql.password,
        database: ServerConfig.mysql.database,
        charset: "UTF8_GENERAL_CI",
        typeCast: true
    })

    pool.connectionLimit = 10;
    pool.waitForConnections = true;
    pool.queueLimit = 0;
}


module.exports = function(){
    return new Promise((res,rej)=>{
        pool.getConnection((err,conn)=>{
            if(err){
                console.log("获取连接错误!");
                return rej(err);
            }else{
                return res(conn);
            }
        })
    })
}