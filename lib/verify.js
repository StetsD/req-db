const nodemailer = require('nodemailer');
const crypto = require('crypto');
const config = require('../config');
const {host, port, auth} = config.mailer;
let transporter = nodemailer.createTransoprt({host, port, auth, secure: true});

const Verify = require('./verify-redis');


exports.sendToken = async user => {

}

exports.checkToken = async token => {

}
