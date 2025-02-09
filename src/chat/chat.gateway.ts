import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { User } from 'decorators/user.decorator';

@WebSocketGateway()
export class ChatGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('connected', socket.id);
    });
  }
  @SubscribeMessage('sendMessage')
  onSendMessage(@User() user, @MessageBody() body: CreateChatDto) {
    console.log(user);
    const message = this.chatService.saveMessage(body);

    // Emit the message to all connected clients
    this.server.emit('receiveMessage', message);
  }
}
