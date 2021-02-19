import Binance from 'binance-api-node'
import fs from 'fs'

const client = Binance.default()

var data = []
var callBySeconds = 3
var interval = 10


var fetchPrices = () => {
    try {
        client.prices()
        .then((response) => {
                for (var attr in response) {
                    if (!attr.includes('BTC', 1)) {
                        delete response[attr]
                    }
                }
                if (data.length >= callBySeconds * interval) {
                    var front = data.shift()
                    for (var attr in front) {
                        var percent = ((response[attr] / front[attr]) - 1) * 100
                        if (percent >= 1 && response[attr] > 0.00000010) {
                            var file = fs.createWriteStream("./logs/dump.log", {flags: 'a'})
                            file.write("The pair " + attr + " increases by " + percent +"% the last 15 seconds. (" + (new Date().toISOString()) + ") (" + response[attr] + ")\n")
                            file.end()
                        }
                    }
                }
                data.push(response)
        })
        .catch((error) => {
                console.log(error)
        })
    } catch (e) {
        console.log(e)
    }
}

setInterval(fetchPrices, 1000 / callBySeconds)
