let user;

exports.setState = state => {
	user = state;
}

exports.getState = () => {
	return user;
}
