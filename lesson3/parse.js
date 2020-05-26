const request = require('request');
const cheerio = require('cheerio');

// request('https://www.banki.ru/products/currency/usd/', (err, response, body) => {
//     if (!err && response.statusCode === 200) {
//         // console.log(body);
//         const $ = cheerio.load(body);
//
//         const rate = $('.currency-table__large-text').eq(1).text();
//         console.log(`Курс доллара: ${rate} рублей.`)
//     }
// });

request('https://auto.ru/catalog/cars/', (err, response, body) => {
    if (!err && response.statusCode === 200) {
        const $ = cheerio.load(body);
        const brands = $('.link_theme_auto.search-form-v2-item');
        brands.each((i, brand) => {
            console.log(i + '. ' + $(brand).text());
            console.log($(brand).prop('href'));
        })
    }
});

request('https://auto.ru/catalog/cars/toyota/', (err, response, body) => {
    if (!err && response.statusCode === 200) {
        const $ = cheerio.load(body);
        const models = $('.link_theme_auto.search-form-v2-item');
        models.each((i, model) => {
            console.log(i + '. ' + $(model).text());
            console.log($(model).prop('href'));
        })
    }
});
