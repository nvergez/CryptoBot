var restify = require('restify')
var setupRoutes = require('./routes.js')
const corsMiddleware = require('restify-cors-middleware2')

var cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: ['*'],
  allowHeaders: ['API-Token'],
  exposeHeaders: ['API-Token-Expiry']
});

const PORT = process.env.PORT_SERVICE_DB;

var server = restify.createServer();

server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());
/*server.use(function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  })*/
server.pre(cors.preflight);
server.use(cors.actual);

setupRoutes(server);

server.listen(PORT, () => {
    console.log("DB service listening on port " + PORT + ".")
})