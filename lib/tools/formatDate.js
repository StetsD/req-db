function formatZero(str){
	let date = str.toString();
	let length = date.length;
	if(length <= 1){
		return `0${date}`;
	}

	return date;
}

function getDate(){
	var date = new Date();

	return {
		date: `${formatZero(date.getDate())}.${formatZero(date.getMonth())}.${date.getFullYear().toString().slice(2)}`,
		time: `${formatZero(date.getHours())}:${formatZero(date.getMinutes())}`
	}
}

exports.formatZero = formatZero;
exports.getDate = getDate;
