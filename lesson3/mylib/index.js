const logger = require('./logger');
const sum = require('./sum');

const dif = (a, b) => {
    logger(a, b);
    return a - b;
};

module.exports = {
    sum,
    dif,
};
