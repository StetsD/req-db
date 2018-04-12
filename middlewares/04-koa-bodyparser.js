// const parser = require('koa-bodyparser');
const body = require('koa-body');
exports.init = app => {
	// app.use(parser());
	app.use(body({
		multipart: true,
		formidable: {
			maxFileSize: 1073741824
		}
	}));
};
