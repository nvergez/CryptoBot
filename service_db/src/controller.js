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

var controller = {}

controller.register = (req, res, next) => {
    try {
        if (!req.body || !req.body.email || !req.body.password) {
            res.send({error: "No body found."})
            return next()
        }
        var myuuid = createUuid();
        var user = {id_user: myuuid, email: req.body.email, password: req.body.password}
        connection.query('INSERT INTO `users` SET ?', user, (err, results, fields) => {
            if (err) {
                console.log(err.code);
                res.send({error: "Sql request error."})
                return next()
            } else {
                if (results.affectedRows == 1)
                    res.send({id: myuuid})
                else
                    res.send({error: "cant create this user"})
                return next()
            }
        })
    } catch (e) {
        res.send({error: e})
        return next()
    }
}

controller.login = (req, res, next) => {
    try {
        if (!req.body || !req.body.email || !req.body.password) {
            res.send({error: "No body found."})
            return next()
        }
        connection.query('SELECT * FROM `users` where `email` = "' + req.body.email + '"', (err, results, fields) => {
            if (err) {
                console.log(err);
                res.send({error: "Sql request error."})
                return next()
            } else {
                if (results[0] && req.body.password == results[0].password)
                    res.send({id: results[0].id_user})
                else
                    res.send({error: "user not found."})
                return next()
            }
        })
    } catch (e) {
        res.send({error: e})
        return next()
    }
}

module.exports = controller