// 引入模块
const fs = require('fs');
const http = require('http');
const path = require('path');

// 第三方模块 mime可以将文件类型转换成mime类型
const mime = require('mime');

// 文件路径的拼接
let rootPath = path.join(__dirname, 'www');

let server = http.createServer((request, response) => {
    // response.setHeader('content-type', 'text/html;charset=utf-8');
    // 生成用户请求的地址
    let targetPath = path.join(rootPath, request.url);
    // 判断请求的路径是否存在
    if (fs.existsSync(targetPath)) {
        // 存在
        fs.stat(targetPath, (err, stats) => {
            // 判断是不是文件
            if (stats.isFile()) {
                // console.log( mime.getType(targetPath))
                // 使用mime类型
                response.setHeader('content-type',mime.getType(targetPath))
                fs.readFile(targetPath,(err,data)=>{
                    response.end(data);
                })
            }

            if(stats.isDirectory()){
                response.end(`
                    
                `)
            }
        });
    } else {
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

server.listen(3000, '127.0.0.1', () => {
    console.log('监听成功！')
})