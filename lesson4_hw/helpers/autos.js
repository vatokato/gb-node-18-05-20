const rp = require('request-promise');
const cheerio = require('cheerio');

const middleware = async (req, res, next) => {
  const { currentBrand } = req.cookies;
  const result = {
    brands: [],
    models: [],
  };

  await rp('https://auto.ru/catalog/cars/', (err, response, body) => {
    if (!err && response.statusCode === 200) {
      const $ = cheerio.load(body);
      const $brands = $('.search-form-v2-list_type_all .link_theme_auto.search-form-v2-item');
      $brands.each((i, brand) => {
        const url = $(brand).prop('href');
        const urlArr = url.split('/');
        const name = urlArr[urlArr.length-2];
        result.brands.push({
          title: $(brand).text(),
          url: $(brand).prop('href'),
          name,
          selected: name === currentBrand ? 'selected' : '',
        });
      });
    }
  });

  if(currentBrand) {
     await rp(`https://auto.ru/catalog/cars/${currentBrand}/`, (err, response, body) => {
      if (!err && response.statusCode === 200) {
        const $ = cheerio.load(body);
        const $models = $('.catalog__showcase').last().find('.mosaic');
        result.models = [];
        $models.each((i, model) => {
          const bgImg = $(model).find('.mosaic__image-inner').prop('style')['background-image'];
          const img = bgImg.match(/\(([^\(]+)\)/)[1];
          result.models.push({
            name: $(model).find('.mosaic__title').text(),
            url: $(model).find('.mosaic__title').prop('href'),
            img,
          });
        });
      }
    });
  }
  req.result = result;
  next();
};

module.exports = {
  middleware,
};
