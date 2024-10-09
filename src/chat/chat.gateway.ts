import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayInit,
    MessageBody,
    ConnectedSocket,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import { ChatService } from './chat.service';
  import { CreateChatDto } from '../dto/create-chat.dto';
  import { JwtService } from '@nestjs/jwt';
  import { UseGuards } from '@nestjs/common';
  import { JwtAuthGuard } from '../guards/jwt-auth.guard';
  
  @WebSocketGateway({ cors: true })
  @UseGuards(JwtAuthGuard) 
  export class ChatGateway implements OnGatewayInit {
    @WebSocketServer() server: Server;
  
    constructor(
      private readonly chatService: ChatService,
      private readonly jwtService: JwtService,
    ) {}
  
    afterInit(server: Server) {
      console.log('WebSocket server initialized'); 
    }
  
    @SubscribeMessage('getAllChats')
    async handleGetAllChats(@ConnectedSocket() socket: Socket) {
      try {
        const chats = await this.chatService.getAllChats();
        socket.emit('allChats', chats); 
      } catch (error) {
        socket.emit('error', { message: 'Error retrieving chats' });
      }
    }
  
    
  }
  