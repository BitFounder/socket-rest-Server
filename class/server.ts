import express from 'express';
import { SERVER_PORT } from '../global/environment';
import SocketIO from 'socket.io';
import http from 'http';
import { Http2Server } from 'http2';
import * as socket from '../sockets/socket';


export default class Server {
   private static _instance: Server;
   public app: express.Application;
   public port: number;
   public io: SocketIO.Server;
   private httpServer: http.Server;

//privado el constructor para tener una única instancia de la clase server
private  constructor(){
       this.app = express();
       this.port = SERVER_PORT;
    
       //inicializamos el httpserver
       this.httpServer = new http.Server(this.app);

       //configuramos los sockets para el server
       this.io = SocketIO( this.httpServer );
      this.escucharsockets();
    }

//metodo publico para acceder e instanciar el Server
public static get instance(){
  return this._instance || (this._instance = new this() );
}


//metodo privado para escuchar conexiones
private escucharsockets(){
    console.log('escuchando conexiones');
    this.io.on('connection', cliente => {
       console.log('cliente conectado');
       //mensajes
       socket.mensajes(cliente, this.io);
       //desconectar
       socket.desconectar( cliente );
    });
   

}


   start(callback : Function ){
       this.httpServer.listen(this.port,callback());
   }

}