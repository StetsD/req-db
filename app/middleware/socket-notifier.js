const {getLocalData} = require('../assets/modules/local-store');

export default function(ctx, next){
	let {route} = ctx;

	// console.log(route);

	next();
}
