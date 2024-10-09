// chat.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop({ required: true })
  chatId: string;

  @Prop({ type: [{ type: String }] })
  participants: string[];

  @Prop({ type: [{ sender: String, message: String, timestamp: Date }] })
  messages: { sender: string; message: string; timestamp: Date }[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
