import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chat, ChatDocument } from '../schemas/chat.schema';
import { Model } from 'mongoose';
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
    if (!chat) {
      throw new NotFoundException('Chat not found');
    }
    chat.messages.push({
      sender: sendMessageDto.sender,
      message: sendMessageDto.message,
      timestamp: new Date(),
    });
    return chat.save();
  }

  async getChat(chatId: string): Promise<Chat> {
    const chat = await this.chatModel.findOne({ chatId }).exec();
    if (!chat) {
      throw new NotFoundException('Chat not found');
    }
    return chat;
  }

  async getAllChats(): Promise<Chat[]> {
    return this.chatModel.find().exec();
  }
}
