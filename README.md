<h3 align= "center">One.js-文档<h3>

##### 1.自我概述

```tex
这是一个用于快捷创建API(Mock)数据的小工具
```

##### 2.目录结构

```tex
config 核心配置目录
	- server.one.config.js 服务相关配置文件
routes Api(路由)目录
	- index.js 路由工厂文件
	- ... 可自行添加任意 "路由文件"
static 静态文件目录
	- ... 可存放任意文件
utils 核心工具目录
	- ... 提供相关服务
app.js 启动文件
```

##### 3.使用流程

1. 修改配置文件

   ```javascript
   //位置: 项目目录/config/server.one.config.js
   
   module.exports = {
       // isCors: true, 是否允许跨域
       listen: {
           host: "localhost", //监听主机
           port: 8000 //监听端口号
       },
       mysql: {
           host: ***, //mysql主机
           port: ***, //mysql端口号
           user: ***, //访问用户名
           password: ***, //访问密码
           database: *** //访问数据库
       }
   }
   ```

2. 配置路由(Api)文件: 此目录可添加任意API(路由/js)文件,程序会自动扫描并注册

   ``` javascript
   // 项目目录/routes/*.js
   module.exports = {
       // baseUrl: *** : String,   基础路径 可不写
       list: [ //API列表
           // {
           //     path: ***: String,  //配置请求路径
           //     sql: ***: String,    //sql 当定义sql时以sql数据为主
           //     sqlParam: []： Array,   //sql参数 
           //     method: ***: String,  //请求方式 GET POST ... all(所有请求)
           //     data: ***: Any
           // }
       ]
   }
   ```

   * 注: 配置baseUrl后API路径为 baseUrl + path
   * 注: 使用sql时请保证sql配置正确
   * 注: 定义"动态sql"时可以使用“?”为参数占位符并通过sqlParam配置参数，请保证参数顺序正确

3. 静态资源

   * static目录下的资源会自动映射到"/" + 相对于 static的路径位置
   * 如: 项目目录/static/test.jpg 会映射为: http:localhost:8000/test.jpg 以此类推

4. 启动项目

   ```powershell
   node app.js
   ```

说明: 项目克隆完毕后可直接进行启动，打开浏览器访问 "http://localhost:8000"目录试试吧