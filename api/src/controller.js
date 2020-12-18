import errors from 'restify-errors'
import Binance from 'binance-api-node'

const client = Binance.default({
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET
})

var controller = {}

controller.ping = (req, res, next) => {
    client.ping()
    .then((response) => {
        if (response) {
            res.send({ping: true})
            return next()
        } else {
            return next(new errors.BadRequestError("Error"))
        }
    })
    .catch((error) => {
        return next(new errors.BadRequestError("Error"))
    })
};

controller.candles = (req, res, next) => {
    if (!req.query.symbol) {
        return next(new errors.BadRequestError("You have to give symbol."))
    }
    client.candles(req.query)
    .then((response) => {
        res.send(response)
        return next()
    })
    .catch((error) => {
        return next(new errors.BadRequestError("Error"))
    })
}

controller.order = (req, res, next) => {

}

controller.account = (req, res, next) => {
    try {
    client.accountInfo()
    .then((response) => {
        res.send(response)
        return next()
    })
    .catch((error) => {
        console.log(error)
        return next(new errors.BadRequestError("error"))
    })
    } catch (e) {
        console.log(e)
        return next(new errors.BadRequestError("cought"))
    }
}

export default controller