const mysql = require("mysql2");

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'oht2',
    password: 'matkakertomus',
    database: 'matkakertomus',
    port: 3306,
    dateStrings: true
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Tietokanta yhdistetty!");
});

module.exports = connection