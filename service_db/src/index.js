var mysql = require('mysql');
var {v4: createUuid} = require('uuid');

var connection = mysql.createConnection({
    host: 'database-mysql',
    user: 'root',
    password: 'password',
    database: 'CryptoBot_db'
});

connection.connect((err) => {
    if (err) {
        console.log('error connecting:' + err.stack);
        return;
    }

    console.log('connected as id' + connection.threadId);
});

//var myuuid = createUuid();
//var user = {id_user: myuuid, email: 'nicolas.vergez@example.com', password: 'mypass'};
var query1 = 'INSERT INTO users SET ?'; // user
var query2 = 'SELECT * FROM `users` where `email` = "nicolas.vergez@example.com"';

connection.query(query2, (err, results, fields) => {
    if (err) {
        console.log(err);
    } else {
        console.log(results[0].id_user);
    }
})

connection.end();