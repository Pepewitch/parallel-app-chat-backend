export interface Message {
  sender: string;
  timestamp: Date;
  text: string;
  roomId: string;
}

export interface IncomingMessage {
  roomId: string;
  message: Message;
}
