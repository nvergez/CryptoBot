var controller = require('./controller.js')

function setupRoutes(server) {
    server.post('/register', controller.register)

    server.post('/login', controller.login)
};

module.exports = setupRoutes;