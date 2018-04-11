exports.formatZero = str => {
	let date = str.toString();
	let length = date.length;
	if(length <= 1){
		return `0${date}`;
	}

	return date;
}
