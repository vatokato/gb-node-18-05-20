const rp = require('request-promise');
const cheerio = require('cheerio');
const http = require('http');

/*
Создать программу для получения информации о последних новостей с выбранного вами сайта в структурированном виде
 */

http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
    });
    Promise.all([
      rp('https://ria.ru/world/'),
      rp('https://ria.ru/politics/'),
      rp('https://ria.ru/economy/'),
    ])
      .then(
        result => {
            const newsArray = result.map(renderNews);
            res.write(`
                <div style="display:flex; justify-content: space-between">
                    <div>${newsArray.join('</div><div>')}</div>
                </div>
            `);
            res.end();
        },
        error => {
            res.write('Ошибка');
            res.end();
        }
      );
}).listen(8888);


function renderNews (body) {
    const $ = cheerio.load(body);
    let content = `<h2>${$('.tag-input__tag-text').eq(0).text()}</h2>`;
    const news = $('.list-item__content');
    news.each((i, item) => {
        if(i>4) return;
        content += '<div>';
        content += `<h3>${$(item).find('.list-item__title').eq(0).text()}</h3>`;
        content += `<img src="${$(item).find('img').eq(0).prop('src')}" height="80" />`;
        content += '</div>';
    });
    return content;
}