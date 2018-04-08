const KEY = 'app';

export function addLocalData(data){
	try{
		let jsonData = JSON.stringify(data);
		window.localStorage.setItem(KEY, jsonData);
	}catch(err){
		console.error(err);
	}
}

export function removeLocalData(key){
	if(!key){
		window.localStorage.removeItem(KEY);
	}

	//TODO: add for single key
}

export function getLocalData(key){
	try{
		var data = JSON.parse(window.localStorage.getItem(KEY));
	}catch(err){
		console.error(err);
	}

	if(!key){
		return data;
	}else{
		return data[key];
	}
}
