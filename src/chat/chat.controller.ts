import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from '../dto/create-chat.dto';
import { SendMessageDto } from '../dto/send-message.dto';
import { Chat } from '../schemas/chat.schema';

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}


  @Post()
  async createChat(@Body() createChatDto: CreateChatDto): Promise<Chat> {
    return this.chatService.createChat(createChatDto);
  }


  @Post('send-message')
  async sendMessage(@Body() sendMessageDto: SendMessageDto): Promise<Chat> {
    return this.chatService.addMessage(sendMessageDto);
  }

  @Get()
  async getAllChats(): Promise<Chat[]> {
    return this.chatService.getAllChats();
  }


  @Get(':chatId')
  async getChat(@Param('chatId') chatId: string): Promise<Chat> {
    return this.chatService.getChat(chatId);
  }
}
