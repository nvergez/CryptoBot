import controller from './controller.js'

function setupRoutes(server) {
    server.get("/ping", controller.ping)

    server.get("/candles", controller.candles)

    server.post("/order", controller.order)

    server.get("/account/infos", controller.account)

    server.get("/account/totalBalance", controller.totalBalance)

    server.get("/account/allBalances", controller.allBalances)

    server.get("/account/openOrders", controller.openOrders)

    server.get("/prices/btc/24h", controller.prices24hBtc)
};

export default setupRoutes;