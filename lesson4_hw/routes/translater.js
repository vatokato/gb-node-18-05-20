const express = require('express');
const router = express.Router();
const request = require('request');
const KEY = 'trnsl.1.1.20200526T163648Z.640a084ccabf54f1.2804f880139e6c39b909906f82449409b707bcd8';
const { getDirections } = require('../helpers/translater');

router.get('/', (req, res) => {
  res.render('translater', {
    ...req.result,
  });
});

router.post('/', (req, res) => {
  const { direction, text: sourceText } = req.body;

  const result = {
    sourceText,
    directions: getDirections(direction),
  };

  res.cookie('direction', direction);
  res.cookie('sourceText', sourceText);

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
        result.error = 'Ошибка, попробуйте еще раз';
      } else {
        const { text } = body && JSON.parse(body);
        result.translatedText = text;
        res.cookie('translatedText', text);
      }
      res.render('translater', { ...result });
    });
  } else {
    res.render('translater', { ...result });
  }
});

module.exports = router;
