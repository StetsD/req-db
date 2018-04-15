const fs = require('fs');
const path = require('path');

module.exports = async function(p){
	let sep = '/';

	let segments = p.split(sep);
	let current = '';
	let i = 0;

	while(i < segments.length){
		current = path.join(current, segments[i]);
		try{
			fs.statSync(current);
		}catch(e){
			fs.mkdirSync(current);
		}

		i++;
	}
}
