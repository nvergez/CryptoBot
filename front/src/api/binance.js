var axios = require('axios')

async function getTotalBalance() {
    const res = await axios.get("http://localhost:9000/account/totalBalance")
    return res.data
}

async function getAllBalances() {
    const res = await axios.get("http://localhost:9000/account/allBalances")
    return res.data
}

module.exports = { getTotalBalance, getAllBalances }