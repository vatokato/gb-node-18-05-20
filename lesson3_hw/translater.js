const request = require('request');
const http = require('http');
const url = require('url');
/*
2) Создать переводчик слов с английского на русский, который будет
обрабатывать входящие GET запросы и возвращать ответы,
полученные через API Яндекс.Переводчика.

Ссылка для получения ключа API Яндекс.Переводчика:
http://api.yandex.ru/key/form.xml?service=trnsl

Документация API Переводчика:
http://api.yandex.ru/translate/doc/dg/reference/translate.xml

Пример GET запроса к API:
https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200526T163648Z.640a084ccabf54f1.2804f880139e6c39b909906f82449409b707bcd8&lang=ru-en&text=%D0%9F%D1%80%D0%B8%D0%B2%D0%B5%D1%82
 */

const KEY = 'trnsl.1.1.20200526T163648Z.640a084ccabf54f1.2804f880139e6c39b909906f82449409b707bcd8';

http.createServer((req, res) => {
  const params = url.parse(req.url, true);
  const { query = {} } = params;
  if (params.pathname === '/translater') {
    const { text: sourceText = '', direction='ru-en' } = query;
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
    });
    if(sourceText) {
      request({
        url: 'https://translate.yandex.net/api/v1.5/tr.json/translate',
        method: 'get',
        qs: {
          key: KEY,
          lang: direction,
          text: sourceText,
        }
      }, (error, response, body) => {
        if (error) {
          res.write('Ошибка, попробуйте еще раз');
          res.end();
          return;
        }
        const { text } = body && JSON.parse(body);
        res.write(getForm({ sourceText, translate: text, direction }));
        res.end();
      });
    } else {
      res.write(getForm({ direction: 'ru-en' }));
      res.end();
    }
  } else {
    res.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8',
    });
    res.write('Привет Мир!');
    res.end();
  }
}).listen(8888);


function getForm({sourceText = '', translate = '', direction='ru-en'}) {
  return `
    <form 
      action="" 
      method="get" 
      style="min-width: 300px; margin: 20px 30px; display: flex; justify-content: space-between; font-family: Arial"
    >
      <div style="width: 40%;">
          <textarea 
            name="text" 
            placeholder="Введите текст"
            style="width: 100%; height: 20vh; margin-bottom: 10px;  border: 1px solid #ccc; padding: 10px"
          >${sourceText}</textarea>
          
      </div>
      <div style="width: 14%; text-align: center">
        <label style="display: block; white-space: nowrap">
            <input type="radio" name="direction" value="ru-en" ${direction === 'ru-en' && 'checked'}> ru>en
        </label> 
        <label style="display: block; white-space: nowrap; margin-bottom: 10px;">
            <input type="radio" name="direction" value="en-ru" ${direction === 'en-ru' && 'checked'}> en>ru 
        </label> 
        <input type="submit" value='Перевести' />
      </div>
      <div style="width: 40%; border: 1px solid #ccc; padding: 10px">${translate}</div>
    </form>
  `;
}