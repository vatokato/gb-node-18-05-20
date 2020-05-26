const logger = require('./logger');

const sum = (a, b) => {
    logger(a, b);
    return a + b;
};

module.exports = sum;
