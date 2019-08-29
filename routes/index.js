const Router = require("koa-router");
const fs = require("fs");
const path = require("path");
const getConnection = require("../utils/mysql.util");
const router = new Router();
const dirList = fs.readdirSync("./routes");
let temporaryArr = [];
let src = "";
let url = "";

dirList.forEach(name=>{
    src = path.join(__dirname,name);
    if(fs.lstatSync(src).isDirectory())return;
    if(name == "index.js")return;
    temporaryArr.push(require(src));
})
temporaryArr.forEach(item=>{
    item.list.forEach(route=>{
        router[route.method ? route.method.toLowerCase() : "get"](item.baseUrl ? path.join(item.baseUrl,route.path).replace(/\\/g,"/") : route.path,async ctx=>{
            if(route.sql){
                let conn = await getConnection();
                //开启事物cls
                await new Promise((res,rej)=>{
                    conn.beginTransaction(err=>{
                        if(err)rej(err);
                        else res();
                    })
                }).catch(err=>console.log("开启事务失败:",err));
                //数据库查询操作
                await new Promise((res,rej)=>{
                    conn.query(route.sql,route.sqlParam,function(err,results){
                        if(err){
                            rej(err);
                        }else{
                            res(results);
                        }
                    })
                }).then(async rets=>{
                    await new Promise(res=>conn.commit(()=>res()));
                    ctx.body = rets;
                }).catch(async err=>{
                    await new Promise(res=>conn.rollback(()=>res()));
                    console.log(err);
                }).finally(()=>{
                    conn.release(err=>{if(err)console.log(err)});
                })

            }else{
                //配置固定返回
                ctx.body = route.data;
            }
            
        })
    })
})


module.exports = router;