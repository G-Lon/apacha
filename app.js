const fs = require('fs');
const http = require('http');
const path = require('path');

let rootPath = path.join(__dirname,'www');

let server = http.createServer((request,response)=>{
    response.setHeader('content-type','text/html;charset=utf-8');
    // 生成用户请求的地址
    let targetPath = path.join(rootPath,request.url);
    // 判断请求的路径是否存在
    if(fs.existsSync(targetPath)){
        // 存在
        let stats = fs.stat(targetPath,(err,stats)=>{
            if(stats){
               
            }
            response.end('exist');
        });
        
    }else {
        // 不存在
        response.statusCode = 404;
        response.end(`
            <!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
            <html><head>
            <title>404 Not Found</title>
            </head><body>
            <h1>Not Found</h1>
            <p>The requested URL ${request.url} was not found on this server.</p>
            </body></html>
        `)
    }
    // response.end('hello world');
})

server.listen(3000,'127.0.0.1',()=>{
    console.log('监听成功！')
})