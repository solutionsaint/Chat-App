// chat.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from '../schemas/chat.schema';
import { CreateChatDto } from '../dto/create-chat.dto';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<ChatDocument>) {}

  // Create a new chat
  async createChat(createChatDto: CreateChatDto): Promise<Chat> {
    const createdChat = new this.chatModel(createChatDto);
    return createdChat.save();
  }

  // Add a message to a chat
  async addMessage(chatId: string, sender: string, message: string): Promise<Chat> {
    return this.chatModel.findByIdAndUpdate(
      chatId,
      { $push: { messages: { sender, message, timestamp: new Date() } } },
      { new: true }
    );
  }

  // Get all chats
  async getAllChats(): Promise<Chat[]> {
    return this.chatModel.find().exec();
  }

  // Get a specific chat
  async getChat(chatId: string): Promise<Chat> {
    return this.chatModel.findById(chatId).exec();
  }
}
