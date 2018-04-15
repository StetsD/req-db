exports.addPostfixExt = (str, prefix) => {
	let arr = str.split('/');
	let file = arr[arr.length - 1];
	arr[arr.length - 1] = file.replace(/(\..{3,4}$)/g, prefix + "$1");
	return arr.join('/');
}
