import io from 'socket.io';
import { Server } from 'http';

export default class Socket {
  public static mount(server: Server) {
    this.io = io(server, { origins: '*:*' });
    this.chat();
  }
  private static io: io.Server;
  private static chat() {
    const chat = this.io.of('/chat');
    chat.on('connection', socket => {
      console.log(socket.handshake.query);
      const { roomId: connectionRoomId } = socket.handshake.query;
      if (connectionRoomId) {
        socket.join(connectionRoomId);
      } else {
        socket.join('global');
      }
      socket.on('message', ({ roomId, message }) => {
        console.log('message', { roomId, message, socket: socket.client.id });
        chat.to(roomId).emit('message', message);
      });
      socket.on('join', roomId => {
        console.log('join', { roomId, socket: socket.client.id });
        socket.join(roomId);
        chat.to(roomId).emit('announce', `JOIN : ${socket.id}`);
      });
      socket.on('leave', roomId => {
        console.log('leave', { roomId, socket: socket.client.id });
        socket.leave(roomId);
        chat.to(roomId).emit('announce', `LEAVE : ${socket.id}`);
      });
    });
  }
}
