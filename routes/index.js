const Router = require("koa-router");
const fs = require("fs");
const path = require("path");
const router = new Router();
const dirList = fs.readdirSync("./routes");
let temporaryArr = [];
let src = "";

dirList.forEach(name=>{
    src = path.join(__dirname,name);
    if(fs.lstatSync(src).isDirectory())return;
    if(name == "index.js")return;
    temporaryArr.push(require(src));
})


temporaryArr.forEach(item=>{
    if(item.baseUrl){
        item.list.forEach(route=>{
            router[route.method.toLowerCase()](item.baseUrl + route.path,async ctx=>{
                ctx.body = route.data;
            })
        })
    }else{
        item.list.forEach(route=>{
            router[route.method.toLowerCase()](route.path,async ctx=>{
                ctx.body = route.data;
            })
        })
    }
})


module.exports = router;