import { Entity, ObjectIdColumn, Column, ObjectID } from 'typeorm';

@Entity()
export class Read {
  @ObjectIdColumn()
  id: ObjectID;
  @Column('varchar', { length: 255 }) username: string;
  @Column('varchar', { length: 255 }) roomId: string;
  @Column() lastRead: Date;
  constructor(username: string, roomId: string, lastRead: Date) {
    this.username = username;
    this.roomId = roomId;
    this.lastRead = lastRead;
  }
}
