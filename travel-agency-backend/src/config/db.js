const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Log when the pool is created
console.log('Database pool created');

// Log when a connection is acquired from the pool
pool.on('acquire', (connection) => {
  console.log('Connection %d acquired', connection.threadId);
});

// Log when a connection is released back to the pool
pool.on('release', (connection) => {
  console.log('Connection %d released', connection.threadId);
});

// Log when a new connection is made within the pool
pool.on('connection', (connection) => {
  console.log('New connection %d established', connection.threadId);
});

// Log pool errors
pool.on('error', (err) => {
  console.error('Pool error:', err);
});

module.exports = pool.promise();