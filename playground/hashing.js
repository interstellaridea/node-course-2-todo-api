const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');

let data = { id: 10 };

// signes it, creates the hash
let token = jwt.sign(data, '123abc') 
console.log(token);

// takes token and secret and verifies by decoding
let decoded = jwt.verify(token, '123abc');
console.log(decoded);


// let message = 'I am a user number 3';
// let hash = SHA256(message).toString()

// console.log(`Message: ${message}`)
// console.log(`Hash: ${hash}`)

// let data = {
//   id: 3
// }

// let token = {
//   data,
//   hash: SHA256(JSON.stringify(data) +'salty').toString()
// }

// // hack attempt.
// token.data.id = 5
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// //validate the hash.
// let resultHash = SHA256(JSON.stringify(token.data) + 'salty').toString()
// if ( resultHash === token.hash ) {
//   console.log('Data was not changed');
// } else {
//   console.log('data was hacked!')
// }