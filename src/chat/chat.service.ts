import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from '../schemas/chat.schema';
import { CreateChatDto } from '../dto/create-chat.dto';
import { SendMessageDto } from '../dto/send-message.dto';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<ChatDocument>) {}

  async createChat(createChatDto: CreateChatDto): Promise<Chat> {
    const newChat = new this.chatModel(createChatDto);
    return newChat.save();
  }

  async addMessage(sendMessageDto: SendMessageDto): Promise<Chat> {
    const chat = await this.chatModel.findOne({ chatId: sendMessageDto.chatId });
    if (chat) {
      chat.messages.push({
        sender: sendMessageDto.sender,
        message: sendMessageDto.message,
        timestamp: new Date(),
      });
      return chat.save();
    }
    throw new Error('Chat not found');
  }

  async getAllChats(): Promise<Chat[]> {
    return this.chatModel.find().exec();
  }

  async getChat(chatId: string): Promise<Chat | null> {
    return this.chatModel.findOne({ chatId }).exec();
  }
}
