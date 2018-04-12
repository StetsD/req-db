class Clients {
	constructor(){
		this.collection = {};
	}

	addClient(client){
		this.collection[client.login] = client;
	}

	getClient(login){
		if(this.collection[login]){
			return this.collection[login];
		}
		return false;
	}

	removeClient(login){
		if(this.collection[login]){
			delete this.collection[login];
		}
	}

}

let clients = new Clients();

module.exports = clients;
