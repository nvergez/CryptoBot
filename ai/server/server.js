import restify from 'restify'
import setupRoutes from './routes.js'

const PORT = process.env.PORT_AI;

var server = restify.createServer();

server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());
server.use(function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  })

setupRoutes(server);

server.listen(PORT, () => {
    console.log("AI service listening on port " + PORT + ".")
})