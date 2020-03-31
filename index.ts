import Server from "./class/server";
import { SERVER_PORT } from "./global/environment";
import  router  from "./routes/router";
import bodyParser from 'body-parser';
import cors from 'cors';

const server = new Server();

//bodyparser
//configuracion para leer el body de peticiones json
server.app.use( bodyParser.urlencoded({ extended: true }) );
//configuracion para pasar a formato json los datos del body
server.app.use( bodyParser.json() ); 

//configurar el cors
//permite que los clientes se conecten a mi backend aunque no estén en el mismo dominio, y no seran rechazados
server.app.use( cors({ origin: true, credentials: true }) );

//rutas de servicios rest
server.app.use('/',router);

server.start( () => {
console.log(`servidor corriendo en el puerto ${SERVER_PORT}`);
});