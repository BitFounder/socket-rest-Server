import { Socket } from 'socket.io';
import socketIO from 'socket.io';  


//desconectar un cliente
export const desconectar = (cliente: Socket) => {
   cliente.on('disconnect', () => {
     console.log('Cliente desconectado');
   });
}

//escuchar mensajes
export const mensajes = (cliente: Socket, io: socketIO.Server) => {
  cliente.on('mensaje',(payload: { de: string, cuerpo: string }) => {
     console.log('Mensaje recibido', payload);
     io.emit('nuevo-mensaje', payload);
  });
}