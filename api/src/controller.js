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
    client.order(req.query)
    .then((response) => {
        console.log(response)
        res.send(response)
        return next()
    })
    .catch((error) => {
        console.log(error)
        res.send(400, error)
        return next()
    })
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

controller.totalBalance = async (req, res, next) => {
    try {
        var btc = 0
        var data = await client.accountInfo()
        var prices = await client.prices()
        var balances = data.balances
        for (var item of balances) {
            var tmp = parseFloat(item.free) + parseFloat(item.locked)
            if (item.asset == 'BTC') {
                btc += tmp
                continue
            }
            if (tmp > 0) {
                if (prices[item.asset+'BTC'])
                    btc += (parseFloat(prices[item.asset+'BTC']) * tmp)
            }
        }
        var result = parseFloat(prices.BTCBUSD) * btc
        res.send({balance: result.toFixed(2)})
        return next()
    } catch (e) {
        console.log(e)
        return next(new errors.BadRequestError("cought"))
    }
}

controller.allBalances = async (req, res, next) => {
    try {
        var result = {}
        var data = await client.accountInfo()
        var prices = await client.prices()
        var balances = data.balances
        for (var item of balances) {
            var tmp = parseFloat(item.free) + parseFloat(item.locked)
            if (item.asset == 'BTC') {
                result[item.asset] = tmp
                continue
            }
            if (tmp > 0) {
                if (prices[item.asset+'BTC'])
                    result[item.asset] = (parseFloat(prices[item.asset+'BTC']) * tmp)
            }
        }
        for (var item in result) {
            result[item] = (parseFloat(prices.BTCBUSD) * result[item]).toFixed(2)
        }
        result = Object.fromEntries(
            Object.entries(result).sort(([,a],[,b]) => b-a)
        );
        res.send(result)
        return next()
    } catch (e) {
        console.log(e)
        return next(new errors.BadRequestError("cought"))
    }
}

controller.openOrders = async (req, res, next) => {
    try {
        var options = { weekday: 'short', year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        var result = []
        var data = await client.openOrders()
        data.sort((a, b) => (a.updateTime > b.updateTime) ? 1 : (b.updateTime > a.updateTime) ? -1 : 0).reverse()
        for (var item of data) {
            var tmp = {}
            tmp.id = item.orderId
            tmp.date = (new Date(item.updateTime)).toLocaleDateString("en-US", options)
            tmp.pair = item.symbol
            tmp.type = item.type
            tmp.side = item.side
            tmp.price = item.price
            tmp.quantity = item.origQty
            tmp.status = item.status
            result.push(tmp)
        }
        res.send(result)
        return next()
    } catch (e) {
        console.log(e)
        return next(new errors.BadRequestError("cought"))
    }
}

controller.prices24hBtc = async (req, res, next) => {
    try {
        var result = []
        var data = await client.candles({symbol: 'BTCUSDT', interval: '1h', limit: 12})
        for (var item of data) {
            var tmp = {}
            var date = new Date(item.closeTime + 1000)
            tmp.time = date.getHours() + ':' + ('0' + date.getMinutes()).substr(-2)
            tmp.amount = item.close
            result.push(tmp)
        }
        res.send(result)
        return next()
    } catch (e) {
        console.log(e)
        return next(new errors.BadRequestError("cought"))
    }
}
export default controller