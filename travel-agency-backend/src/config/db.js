const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const dbUser = process.env.USE_USER_2 ? process.env.DB_USER_2 : process.env.DB_USER_1;
const dbPassword = process.env.USE_USER_2 ? process.env.DB_PASSWORD_2 : process.env.DB_PASSWORD_1;

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: dbUser,
  password: dbPassword,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
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

// Function to test the pool connection with retries
{/*const testConnectionWithRetry = (retries = 5, delay = 5000) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting connection from pool:', err);

      if (retries > 0) {
        console.log(`Retrying in ${delay / 1000} seconds... (${retries} retries left)`);
        setTimeout(() => testConnectionWithRetry(retries - 1, delay), delay);
      } else {
        console.error('Max retries reached. Could not connect to the database.');
        process.exit(1); // Exit the process if max retries are reached
      }
    } else {
      console.log('Successfully connected to the database');
      connection.release(); // Release the connection back to the pool
    }
  });
};

// Test the connection with retries
testConnectionWithRetry();*/}

module.exports = pool.promise();