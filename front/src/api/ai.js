var axios = require('axios')

async function fetchLogs() {
    const res = await axios.get("http://localhost:9001/getLogs")
    return res.data
}

module.exports = { fetchLogs }