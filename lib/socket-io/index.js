const {io} = require('../../config');
const SIO = require('socket.io');
const {host, port} = require('../../config');
// const sioEmitter = require('socket.io-emitter')({host, port});


const {client} = require('../redis');
let {getDate} = require('../tools/formatDate');
const clients = require('./clients');

var sio = null
var socket = null;

exports.init = server => {
	this.sio = SIO(server);

	this.sio.on('connection', function(socket){

		this.socket = socket;

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

exports.sio = sio;
exports.socket = socket;
