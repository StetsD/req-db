module.exports = (form, url, cbs, cbp) => {
	form.addEventListener('submit', e => {
		e.preventDefault();

		let data = new FormData(form);
		data.append('name', $nuxt.$store.getters['user/getUser'].name);

		var req = new XMLHttpRequest();
		req.open('POST', '/api/v1/chat', true);
		req.onload = function(event){
			if(req.status == 200){
				console.log('Uploaded');
			}else{
				console.log('Error')
			}
		}

		req.upload.onprogress = function(event){
			console.log(event.loaded, event.total);
		}

		req.send(data);
	}, false);
}

//http://mailru.github.io/FileAPI/
