import controller from './controller.js'

function setupRoutes(server) {
    server.get("/ping", controller.ping)

    server.get("/candles", controller.candles)

    server.post("/order", controller.order)

    server.get("/account/infos", controller.account)
};

export default setupRoutes;