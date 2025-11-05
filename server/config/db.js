
// server/config/db.
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});


// pool.connect(err => {
//   if (err) throw err;
//   console.log('📘 MySQL Connected...');
// });

module.exports = pool;
