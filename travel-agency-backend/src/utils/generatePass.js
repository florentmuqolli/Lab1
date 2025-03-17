const bcrypt = require('bcryptjs');
const hashedPassword = bcrypt.hashSync('admin007', 10);
console.log('Hashed password:', hashedPassword);