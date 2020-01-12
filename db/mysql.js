const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'Kotlet',
    password: 'zagloba0101',
    database: 'gastrotogo'
});

module.exports = pool.promise();
