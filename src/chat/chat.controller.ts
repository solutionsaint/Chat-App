import { Controller, Get } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  
  @Get()
  async getAllChats() {
    return this.chatService.getAllChats();
  }
}
