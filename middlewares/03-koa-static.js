const serve = require('koa-static');
const path = require('path');

exports.init = (app) => app.use(serve(path.resolve(process.cwd(), 'public')));
