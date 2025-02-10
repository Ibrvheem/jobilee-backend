import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './entities/chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async saveMessage(payload: string | CreateChatDto) {
    try {
      // If payload is a string, parse it
      if (typeof payload === 'string') {
        payload = JSON.parse(payload);
      }

      console.log('Parsed Payload:', payload);

      if (typeof payload !== 'object') {
        throw new Error('Payload must be an object');
      }

      const message = new this.messageModel(payload);
      return await message.save();
    } catch (error) {
      console.error('Error parsing payload:', error);
      throw new Error('Invalid payload format');
    }
  }

  async getChatHistory(user1: string, user2: string) {
    return this.messageModel
      .find({
        $or: [
          { senderId: user1, receiverId: user2 },
          { senderId: user2, receiverId: user1 },
        ],
      })
      .sort({ createdAt: 1 })
      .exec();
  }
}
