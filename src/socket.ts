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
      socket.join('global');
      socket.on('message', ({ roomId, message }) => {
        chat.to(roomId).emit('message', message);
      });
      socket.on('join', roomId => {
        socket.join(roomId);
        chat.to(roomId).emit('announce', `JOIN : ${socket.id}`);
      });
      socket.on('leave', roomId => {
        socket.leave(roomId);
        chat.to(roomId).emit('announce', `LEAVE : ${socket.id}`);
      });
    });
  }
}
