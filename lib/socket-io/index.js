const {io} = require('../../config');
const SIO = require('socket.io');
const {client} = require('../redis');
const {formatZero} = require('../tools/formatDate');
let {getState} = require('../userState');

let sio = null

exports.init = server => {
	sio = SIO(server);

	sio.on('connection', function(socket){
		console.info("SIO: CONNECTION");

		socket.on('disconnect', ()=>{
			console.info('SIO: USER DISCONNECTED');
		});

		socket.on('error', function(e){
			console.error(e);
		});

		socket.on(io['chat:message'], function(msg){
			let state = getState();
			//not auth
			if(!state || state.verify === undefined){
				socket.emit(io['app:error'], {msg: 'unauthorized', status: 401})
				return;
			}
			//not verify
			if(state.verify === 0){
				socket.emit(io['app:error'], {msg: 'not verifyed', status: 400})
				return;
			}

			var date = new Date();
			let upMsg = Object.assign({}, msg, {
				date: `${formatZero(date.getDate())}.${formatZero(date.getMonth())}.${date.getFullYear().toString().slice(2)}`,
				time: `${formatZero(date.getHours())}:${formatZero(date.getMinutes())}`
			});

			client.rpush('chat-history', JSON.stringify(upMsg));
			client.ltrim('chat-history', 0, 99);
			socket.emit(io['chat:message'], upMsg);
			socket.broadcast.emit(io['chat:message'], upMsg);
		});
	});
}

exports.sioInstance = sio;
