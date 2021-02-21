const bcrypt = require('bcrypt');

// Generate Salt
const salt = bcrypt.genSaltSync(15);

const pswd = 'N3aqV5q7cHN8RH6K'
// Hash Password
const hash = bcrypt.hashSync(pswd, salt);

console.log(hash)


bcrypt.compare(pswd, hash, function(err, result) {
    console.log(result)
});