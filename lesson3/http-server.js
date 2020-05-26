const http = require('http');
const url = require('url');

http.createServer((request, response) => {
    // console.log(request, response);
    // console.log(request.url);
    const params = url.parse(request.url, true);
    console.log(params);
    if (params.pathname === '/goods') {
        response.writeHead(200, {
            'Content-Type': 'text/plain; charset=utf-8',
        });
        response.write(`На этой странице ${params.query.per_list} товаров`);
        response.end();
    } else {
        response.writeHead(200, {
            'Content-Type': 'text/plain; charset=utf-8',
        });
        response.write('Привет Мир!');
        response.end();
    }
}).listen(8888);
