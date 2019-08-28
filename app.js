const Koa = require("koa");
const router = require("./routes");
const static = require("koa-static");
const ServerConfig = require("./config/server.one.config");

const app = new Koa();




app.use(router.routes())
   .use(router.allowedMethods());
app.use(static("static"));


app.listen(ServerConfig.listen.port,ServerConfig.listen.host,()=>console.log("服务器启动成功: 当前正在监听 [" + ServerConfig.listen.port + " ] 端口。"));
