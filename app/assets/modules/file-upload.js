module.exports = (file, url, cbs, cbp) => {
	let data = new FormData();
	data.append('name', $nuxt.$store.getters['user/getUser'].name);
	data.append('file', file);

	var req = new XMLHttpRequest();
	req.open('POST', url, true);
	req.onload = function(event){
		if(req.status == 200){
			cbs('Upload Success');
		}else{
			console.log('Error upload');
		}
	}

	req.upload.onprogress = function(event){
		cbp(event.loaded, event.total);
		// console.log(event.loaded, event.total);
	}

	req.send(data);
}
