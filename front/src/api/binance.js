var axios = require('axios')

var stopApiCall = false

async function getTotalBalance() {
    if (stopApiCall)
        return {balance: 0}
    const res = await axios.get("http://localhost:9000/account/totalBalance")
    return res.data
}

async function getAllBalances() {
    if (stopApiCall)
        return {}
    const res = await axios.get("http://localhost:9000/account/allBalances")
    return res.data
}

async function getOpenOrders() {
    if (stopApiCall)
        return []
    const res = await axios.get("http://localhost:9000/account/openOrders")
    return res.data
}

async function get24hBtc() {
    if (stopApiCall)
        return []
    const res = await axios.get("http://localhost:9000/prices/btc/24h")
    return res.data
}

module.exports = { getTotalBalance, getAllBalances, getOpenOrders, get24hBtc }