import {
  Entity,
  ObjectIdColumn,
  Column,
  ObjectID,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Message {
  @ObjectIdColumn()
  id: ObjectID;
  @Column('varchar', { length: 255 }) username: string;
  @Column('varchar', { length: 255 }) roomId: string;
  @Column('varchar', { length: 255 }) message: string;
  constructor(username: string, roomId: string, message: string) {
    this.username = username;
    this.roomId = roomId;
    this.message = message;
  }
}
