// chat.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop({ required: true })
  chatId: string;

  @Prop({ type: [{ type: String }] }) // assuming participants are stored as an array of strings
  participants: string[];

  @Prop({ type: [{ sender: String, message: String, timestamp: Date }] }) // Assuming a message structure
  messages: { sender: string; message: string; timestamp: Date }[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
