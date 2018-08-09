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
    
    // 指定访问默认路径
    if(request.url == '/index.ppp'){
        fs.readFile('./data/data.json',(err,data)=>{
            // response.setHeader('content-type','text/html;charset=utf-8');
            // console.log(JSON.parse(data.toString()));
            let foodData = JSON.parse(data.toString());
            var tmp = '';
            for(let i=0;i<foodData.length;i++){
                tmp += `<li>${foodData[i]}</li>`
            }
            response.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Document</title>
            </head>
            <body>
                <ul>
                    ${tmp}
                </ul>
            </body>
            </html>
            `)
            return;
        })
    }

    // 判断目标路径是否存在
    if (fs.existsSync(targetPath)){
        // 如果路径存在,再判断文件的类型 文件 / 文件夹
        fs.stat(targetPath,(err,stats)=>{
            // 如果文件的类型的文件，那么就直接读取文件响应
            if(stats.isFile()){
                fs.readFile(targetPath,(err,data)=>{
                    response.end(data)
                })
            }

            // 如果文件的类型是文件夹，那么就将文件夹的内容以列表形式返回
            if(stats.isDirectory()){
                fs.readdir(targetPath,(err,files)=>{

                    let tmp = '';
                    for(let i=0;i<files.length;i++){
                        tmp += `<li><a href="${request.url}${request.url == '/' ? '' : '/'}${files[i]}">${files[i]}</a></li>`
                    }
                    response.end(`
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <meta http-equiv="X-UA-Compatible" content="ie=edge">
                            <title>Document</title>
                        </head>
                        <body>
                            <ul>
                                ${tmp}
                            </ul>
                        </body>
                        </html>
                    `)
                })
            }
        })
    }else {
        // 不存在,返回未找到
        response.end(`
            // 返回404错误
            response.statusCode = 404;

            // 返回错误信息
            <!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
            <html><head>
            <title>404 Not Found</title>
            </head><body>
            <h1>Not Found</h1>
            <p>The requested URL ${request.url} was not found on this server.</p>
            </body></html>
        `)
    }
})

server.listen(3000, '127.0.0.1', () => {
    console.log('监听成功！')
})