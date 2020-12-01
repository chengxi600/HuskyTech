const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 'password';
const someOtherPlaintextPassword = 'not_bacon';

let myhash = "";
bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        console.log(hash);
        myhash = hash;

        bcrypt.compare(myPlaintextPassword, myhash, function(err, result) {
            console.log("hello" + result);
        });
        bcrypt.compare(someOtherPlaintextPassword, myhash, function(err, result) {
            console.log(result);
        });
    });
});

