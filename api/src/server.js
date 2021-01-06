import restify from 'restify'
import setupRoutes from './routes.js'

const PORT = process.env.PORT_API;

var server = restify.createServer();

server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

setupRoutes(server);

server.listen(PORT, () => {
    console.log("Auth service listening on port " + PORT + ".")
})