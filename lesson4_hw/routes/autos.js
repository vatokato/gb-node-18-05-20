const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const { brands, models } = req.result;
  res.render('autos', {
    brands,
    models,
  });
});

router.post('/', (req, res) => {
  const { brand } = req.body;
  res.cookie('currentBrand', brand);
  res.redirect('/autos')
});

module.exports = router;
