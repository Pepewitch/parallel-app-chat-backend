import io from 'socket.io';
import { Server } from 'http';
import MessageModel from './model/MessageModel';
import { IncomingMessage } from './type/message';
import ReadModel from './model/ReadModel';

export default class Socket {
  public static mount(server: Server) {
    this.io = io(server, { origins: '*:*' });
    this.chat();
  }
  private static io: io.Server;
  private static chatIO: io.Namespace;
  private static chat() {
    Socket.chatIO = this.io.of('/chat');
    Socket.chatIO.on('connection', async socket => {
      console.log('connection :', socket.id);
      socket.emit('connect');
      const username =
        socket.handshake.query.username || Math.random().toFixed(5);
      socket.on('initialConnection', ({ roomId }) => {
        Socket.onConnection(username, roomId, socket);
      });
      socket.on('message', event => {
        Socket.onMessage(username, event);
      });
      socket.on('join', roomId => {
        socket.join(roomId);
        Socket.chatIO.to(roomId).emit('announce', `JOIN : ${socket.id}`);
      });
      socket.on('leave', roomId => {
        socket.leave(roomId);
        Socket.chatIO.to(roomId).emit('announce', `LEAVE : ${socket.id}`);
      });
      socket.on('read', async (roomId: string) => {
        const read = await ReadModel.read(username, roomId);
        Socket.chatIO
          .to(roomId)
          .emit('updateRead', { roomId, date: read.lastRead, username });
      });
    });
  }

  private static async onConnection(
    username: string,
    roomId: string,
    socket: io.Socket,
  ) {
    console.log('on connection : ', username);
    socket.join(roomId);
    const [messages, read] = await Promise.all([
      MessageModel.getMessages(roomId),
      ReadModel.read(username, roomId),
    ]);
    socket.emit('initial', { messages, read });
  }

  private static async onMessage(username: string, event: IncomingMessage) {
    const { roomId, message } = event;
    const addedMessage = await MessageModel.addMessage(
      username,
      roomId,
      message.text,
    );
    message.timestamp = addedMessage.insertedId.getTimestamp();
    Socket.chatIO.to(roomId).emit('message', message);
  }
}
