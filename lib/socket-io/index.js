const {io} = require('../../config');
const SIO = require('socket.io');
const {client} = require('../redis');
const {app} = require('../../index.js');
let {getDate} = require('../tools/formatDate');
const clients = require('./clients');

let sio = null

exports.init = server => {
	sio = SIO(server);

	sio.on('connection', function(socket){

		//New Connection
		socket.on(io['app:connect'], function(payload){
			if(payload && payload.verify){
				socket.broadcast.emit(io['app:connect'], {
					name: payload.name,
					...getDate(),
					msg: 'Подключился',
					type: 'connect'
				});
			}
		});

		//New DisConnection
		socket.on(io['app:disconnect'], function(payload){
			clients.removeClient(payload.name);

			if(payload && payload.verify){
				socket.broadcast.emit(io['app:disconnect'], {
					name: payload.name,
					...getDate(),
					msg: 'Отключился',
					type: 'disconnect'
				});
			}
		});

		// Chat message
		socket.on(io['chat:message'], function(msg){

			//not auth
			// if(!state || state.verify === undefined){
			// 	socket.emit(io['app:error'], {msg: 'unauthorized', status: 401})
			// 	return;
			// }

			//not verify
			// console.log(clients.collection);
			if(clients.getClient(msg.name).verify === 0){
				socket.emit(io['app:error'], {msg: 'not verifyed', status: 400})
				return;
			}


			let upMsg = Object.assign({}, msg, getDate());

			client.rpush('chat-history', JSON.stringify(upMsg));
			client.ltrim('chat-history', 0, 99);
			socket.emit(io['chat:message'], upMsg);
			socket.broadcast.emit(io['chat:message'], upMsg);
		});

		socket.on('error', function(e){
			console.error(e);
		});
	});
}

exports.sioInstance = sio;
