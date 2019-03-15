import { getMongoRepository } from 'typeorm';
import { Read } from '../entity/Read';

class ReadModel {
  private readRepository = getMongoRepository(Read);
  async read(username: string, roomId: string) {
    const read = await this.getRead(username, roomId);
    read.lastRead = new Date();
    await this.readRepository.save(read);
    return read;
  }
  async getRead(username: string, roomId: string) {
    const read = await this.readRepository.findOne({ username, roomId });
    return read || new Read(username, roomId, new Date());
  }
}

export default new ReadModel();
