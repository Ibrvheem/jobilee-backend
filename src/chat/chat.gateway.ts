import { OnModuleInit } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';

@WebSocketGateway({
  cors: {
    origin: '*', // Change this to your frontend URL in production
    methods: ['GET', 'POST'],
  },
})
export class ChatGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('New client connected:', socket.id);

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });
  }

  @SubscribeMessage('sendMessage')
  async onSendMessage(
    @MessageBody() body: CreateChatDto,
    @ConnectedSocket() socket: Socket,
  ) {
    console.log('Received message:', body);

    try {
      const message = await this.chatService.saveMessage(body);
      this.server.emit('receiveMessage', message);
    } catch (error) {
      console.error('Error saving message:', error);
      socket.emit('error', { message: 'Failed to save message' });
    }
  }
  @SubscribeMessage('getChatHistory')
  async onGetChatHistory(
    @MessageBody() { user1, user2 }: { user1: string; user2: string },
    @ConnectedSocket() socket: Socket,
  ) {
    try {
      const chatHistory = await this.chatService.getChatHistory(user1, user2);
      socket.emit('chatHistory', chatHistory);
    } catch (error) {
      console.error('Error fetching chat history:', error);
      socket.emit('error', { message: 'Failed to retrieve chat history' });
    }
  }
}
