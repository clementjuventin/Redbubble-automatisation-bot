const bcrypt = require('bcrypt');

// Generate Salt
const salt = bcrypt.genSaltSync(15);

const pswd = 'goKYHHuCWpwp2T5x'
// Hash Password
const hash = bcrypt.hashSync(pswd, salt);

console.log(hash)


bcrypt.compare(pswd, hash, function(err, result) {
    console.log(result)
});