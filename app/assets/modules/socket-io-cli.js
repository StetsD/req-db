const {protocol, host, port, io} = require('../../../config');
const IO = require('socket.io-client')(`${protocol}://${host}:${port}`, {autoConnect: false});

IO.on('disconnect', () => {
	console.log('sockets are disconnected');
});

IO.on(io['app:error'], payload => {
	if(payload && payload.status === 400){
		$nuxt.$store.dispatch('tooltip/callChangeState',
		{msg: 'Вы не можете использовать чат.Пройдите верификацию в личном кабинете',
		status: 'error'});
	}
	if(payload && payload.status === 401){
		$nuxt.$store.commit('user/logout');
	}
});

// New message
IO.on(io['chat:message'], payload => {
	$nuxt.$store.commit('chat/addMsg', payload);
});

// Connected new user
IO.on(io['app:connect'], payload => {
	$nuxt.$store.commit('chat/addMsg', payload);
});

// Disconnected another user
IO.on(io['app:disconnect'], payload => {
	$nuxt.$store.commit('chat/addMsg', payload);
});

function connect(){
	IO.connect()
	let user = $nuxt.$store.getters['user/getUser'];
	IO.emit(io['app:connect'], {
		name: user.name,
		verify: user.verify
	});
}

function disconnect(){
	let user = $nuxt.$store.getters['user/getUser'];
	IO.emit(io['app:disconnect'], {
		name: user.name,
		verify: user.verify
	});
	IO.disconnect();
}


module.exports = {IO, connect, disconnect};
