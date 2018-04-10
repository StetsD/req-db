const {router, apiPath} = require('./index');
const {client: rClient} = require('../lib/redis');

router.get(apiPath('chat'), async(ctx, next) => {
	var messages = await new Promise((res, rej)=>{
		rClient.lrange('chat-history', 0, 99, (err, reply) => {
			if (!err) {
				var result = [];

				for (var msg in reply){
				  result.push(JSON.parse(reply[msg]));
				}


				return res(result);

			} else {
				ctx.throw(500);
			}
		});
	});
	
	ctx.body = messages;
});
