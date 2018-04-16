const {redis: r} = require('../../config');
const bb = require('bluebird');
const redis = require('redis');
bb.promisifyAll(redis.RedisClient.prototype);

const client = redis.createClient({
	host: r.host,
	port: r.port
});

console.log('REDIS CLIENT CREATED');

client.on('connect', () => {
	console.log('REDIS CLIENT CONNECTED');
});

client.on('reconnecting', () => {
	console.log('REDIS RECONNECTING');
});

client.on('error', err => {
	console.log("REDIS ERROR: ", err);
});

exports.rSet = async (key, val) => {
	await client.set(key, val, 'EX', r.expireVerify);
}

exports.rGet = async (key) => {
	return await client.getAsync(key);
}

exports.client = client;


//TODO: reorganizate redis store
//https://redis.io/commands#hash
//https://redis.io/commands/hkeys
