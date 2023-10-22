let mysql = require('mysql2');

let db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'aannie417!',
    database: 'CHEMISTRY'
});

db.connect();

module.exports = db;