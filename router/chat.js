const {router, apiPath} = require('./index');
const {client: rClient} = require('../lib/redis');

router.get(apiPath('chat'), async(ctx, next) => {
	let res;
	var messages = await rClient.lrange('chat-history', 0, 99, function(err, reply) {
	if (!err) {

		  var result = [];

		  for (var msg in reply){
			  result.push(JSON.parse(reply[msg]));
		  }

		  res = result;

		} else {
			ctx.throw(500);
		}
	});

	ctx.status = 200;
	ctx.body = res;
});
