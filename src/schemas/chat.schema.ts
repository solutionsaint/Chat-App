import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Chat {
  @Prop({ required: true })
  chatId: string;

  @Prop({ required: true })
  participants: string[];

  @Prop({ type: [{ sender: String, message: String, timestamp: Date }] })
  messages: { sender: string; message: string; timestamp: Date }[];
}

export type ChatDocument = Chat & Document;

export const ChatSchema = SchemaFactory.createForClass(Chat);
