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
  
    afterInit() {
      console.log('WebSocket server initialized');
    }
  
   
    @SubscribeMessage('createChat')
    async handleCreateChat(
      @MessageBody() data: CreateChatDto,
      @ConnectedSocket() socket: Socket,
    ) {
      console.log('Received createChat event with data:', data);
      try {
        const chat = await this.chatService.createChat(data);
        this.server.emit('chatCreated', chat);
      } catch (error) {
        console.error('Error in handleCreateChat:', error);
        socket.emit('error', { message: 'Error creating chat' });
      }
    }
  

    @SubscribeMessage('sendMessage')
    async handleSendMessage(
      @MessageBody() data: SendMessageDto,
      @ConnectedSocket() socket: Socket,
    ) {
      console.log('Received sendMessage event with data:', data);
      try {
        const chat = await this.chatService.addMessage(data);
        this.server.emit('messageReceived', chat);
      } catch (error) {
        console.error('Error in handleSendMessage:', error);
        socket.emit('error', { message: 'Error sending message' });
      }
    }
  

    @SubscribeMessage('getAllChats')
    async handleGetAllChats(@ConnectedSocket() socket: Socket) {
      console.log('Received getAllChats event');
      try {
        const chats = await this.chatService.getAllChats();
        socket.emit('allChats', chats);
      } catch (error) {
        console.error('Error in handleGetAllChats:', error);
        socket.emit('error', { message: 'Error retrieving chats' });
      }
    }
  
    @SubscribeMessage('joinChat')
    async handleJoinChat(
      @MessageBody() data: { chatId: string },
      @ConnectedSocket() socket: Socket,
    ) {
      console.log('Received joinChat event with data:', data);
      try {
        const chat = await this.chatService.getChat(data.chatId);
        socket.emit('chatHistory', chat);
      } catch (error) {
        console.error('Error in handleJoinChat:', error);
        socket.emit('error', { message: 'Error joining chat' });
      }
    }
  
    handleConnection(socket: Socket) {
      console.log(`Client connected: ${socket.id}`);
    }
  
    handleDisconnect(socket: Socket) {
      console.log(`Client disconnected: ${socket.id}`);
    }
  }
  