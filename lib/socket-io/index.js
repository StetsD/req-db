const {io} = require('../../config');
const SIO = require('socket.io');
const {client} = require('../redis');
let sio = null

let room = '1';

exports.init = server => {
	sio = SIO(server);

	sio.on('connection', function(socket){

		socket.emit('room', room);

		console.info("SIO: CONNECTION");

		socket.on('disconnect', ()=>{
			console.info('SIO: USER DISCONNECTED');
		});

		socket.on('error', function(e){
			console.error(e);
		});

		socket.on(io['chat:message'], function(msg){
			var date = new Date();
			let upMsg = Object.assign({}, msg, {
				date: `${date.getDate()}.0${date.getMonth()}.${date.getFullYear().toString().slice(2)}`,
				time: `${date.getHours()}:${date.getMinutes()}`
			});

			client.rpush('chat-history', JSON.stringify(upMsg));
			client.ltrim('chat-history', 0, 99);
			socket.emit(io['chat:message'], upMsg);
			socket.broadcast.emit(io['chat:message'], upMsg);
		});
	});
}

exports.sioInstance = sio;
