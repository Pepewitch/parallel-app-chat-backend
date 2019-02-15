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
      console.log('connected');
      socket.on('message', message => {
        console.log(message);
        chat.emit('message', message);
      });
    });
  }
}
