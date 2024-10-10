import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop({ required: true, unique: true })
  chatId: string;

  @Prop({ type: [String], required: true })
  participants: string[];

  @Prop({
    type: [
      {
        sender: String,
        message: String,
        timestamp: { type: Date, default: Date.now },
      },
    ],
    default: [],
  })
  messages: Array<{ sender: string; message: string; timestamp: Date }>;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
