import restify from 'restify'
import setupRoutes from './routes.js'

const PORT = process.env.PORT_AI;

var server = restify.createServer();

server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

setupRoutes(server);

server.listen(PORT, () => {
    console.log("AI service listening on port " + PORT + ".")
})