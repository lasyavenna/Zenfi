const mysql = require(mysql2);

const pool = mysql.createPool({
    host: 'YOUR_DB_HOST',
    user: 'YOUR_DB_USER',
    password: 'YOUR_DB_PASSWORD',
    database: 'YOUR_DB_NAME',
    waitForConnections: true,
    connectionLimit: 10,
});

module.exports = pool.promise();