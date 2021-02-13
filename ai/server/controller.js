import errors from 'restify-errors'
import fs from 'fs'

var controller = {}

controller.basic = (req, res, next) => {
    res.send({msg: "yes"})
    return next()
}

controller.logs = (req, res, next) => {
    try {
        var data = fs.readFileSync('./logs/dump.log', {encoding:'utf8', flag:'r'})
        data = data.split('\n')
        data = data.slice(Math.max(data.length - 20, 0)).reverse()
        res.send(data)
        return next()
    } catch (e) {
        res.send([])
        return next()
    }
};

export default controller