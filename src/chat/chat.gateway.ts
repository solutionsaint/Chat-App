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
  import { SendMessageDto } from '../dto/send-message.dto';
  
  @WebSocketGateway({ cors: true })
  export class ChatGateway implements OnGatewayInit {
    @WebSocketServer() server: Server;
  
    constructor(private readonly chatService: ChatService) {}
  
    afterInit(server: Server) {
      console.log('WebSocket server initialized');
    }
  
    @SubscribeMessage('createChat')
    async handleCreateChat(
      @MessageBody() data: CreateChatDto,
      @ConnectedSocket() socket: Socket,
    ) {
      try {
        const chat = await this.chatService.createChat(data);
        this.server.emit('chatCreated', chat);
      } catch (error) {
        socket.emit('error', { message: 'Error creating chat' });
      }
    }
  
    @SubscribeMessage('sendMessage')
    async handleSendMessage(
      @MessageBody() data: SendMessageDto,
      @ConnectedSocket() socket: Socket,
    ) {
      try {
        const chat = await this.chatService.addMessage(data);
        this.server.emit('messageReceived', chat);
      } catch (error) {
        socket.emit('error', { message: 'Error sending message' });
      }
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
  