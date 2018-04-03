const passport = require('koa-passport');

require('./local-strategy');
require('./serialize');

module.exports = passport;
