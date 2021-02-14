import controller from './controller.js'

function setupRoutes(server) {
    server.get('/', controller.basic)
    
    server.get("/getLogs", controller.logs)
};

export default setupRoutes;