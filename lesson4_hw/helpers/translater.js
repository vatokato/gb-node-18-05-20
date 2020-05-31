const middleware = ((req, res, next) => {
  const { direction, sourceText, translatedText } = req.cookies;
  req.result = {
    sourceText,
    translatedText,
    directions: getDirections(direction),
  };
  next();
});

const getDirections = (direction = 'en-ru') => ([
  {title: 'en-ru', checked: (direction === 'en-ru' && 'checked')},
  {title: 'ru-en', checked: (direction === 'ru-en' && 'checked')},
]);

module.exports = {
  middleware,
  getDirections,
};
