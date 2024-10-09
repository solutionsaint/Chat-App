// chat.gateway.ts
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
  @UseGuards(JwtAuthGuard) // Protect WebSocket gateway with JWT guard
  export class ChatGateway implements OnGatewayInit {
    @WebSocketServer() server: Server;
  
    constructor(
      private readonly chatService: ChatService,
      private readonly jwtService: JwtService,
    ) {}
  
    afterInit(server: Server) {
      console.log('WebSocket server initialized'); // Log when the server is initialized
    }
  
    // Handle getting all chats
    @SubscribeMessage('getAllChats')
    async handleGetAllChats(@ConnectedSocket() socket: Socket) {
      try {
        const chats = await this.chatService.getAllChats();
        socket.emit('allChats', chats); // Emit all chats to the user
      } catch (error) {
        socket.emit('error', { message: 'Error retrieving chats' });
      }
    }
  
    // Existing methods (createChat, sendMessage, joinChat, etc.)
  }
  