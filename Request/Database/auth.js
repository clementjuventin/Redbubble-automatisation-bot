const mysql = require('mysql');
const bcrypt = require('bcrypt');

//Connect to database
var connection = mysql.createConnection({
	host: '185.31.40.39',
	user: '209609',
	password: 'lV0ajlBV5t7oREjh',
	database: 'soniastarlette_login'
});
connection.connect();


function delay(time) {
	return new Promise(function(resolve) {
		setTimeout(resolve, time)
	});
}

async function checkKey(key) {
	var ret = false
	q = `SELECT * from login`
	connection.query(q, function(error, results) {
		results.forEach(element => {
			if (bcrypt.compareSync(key, element.keyLog)) {
				ret = true
			}
		});
	});
	await delay(2000)
	return ret
}

async function ckeckVersion(value) {
	var ret
	q = `SELECT * from version`
	connection.query(q, function(error, results) {
		ret = (value == results[0].version)
	});
	await delay(2000)
	return ret
}

module.exports = {
	checkKey,
	ckeckVersion
};