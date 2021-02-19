var axios = require('axios')

async function createUser(email, password) {
    const res = await axios.post("http://localhost:9002/register",
    {email: email, password: password})

    console.log(res)
    return res.data
}

async function getUser(email, password) {
    const res = await axios.post("http://localhost:9002/login",
    {email: email, password: password})
    return res.data
}

module.exports = { createUser, getUser }