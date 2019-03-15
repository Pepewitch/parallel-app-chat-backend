import { getMongoRepository, ObjectID } from 'typeorm';
import { Message } from '../entity/Message';

class MessageModel {
  private messageRepository = getMongoRepository(Message);
  async addMessage(username: string, roomId: string, message: string) {
    return await this.messageRepository.insertOne(
      new Message(username, roomId, message),
    );
  }
  async getMessages(roomId: string) {
    console.log({ roomId });
    const messages = await this.messageRepository.find({
      where: { roomId },
    });
    console.log(messages);
    return messages.map(message => {
      return {
        sender: message.username,
        timestamp: message.id.getTimestamp(),
        text: message.message,
        roomId,
      };
    });
  }
}

export default new MessageModel();
