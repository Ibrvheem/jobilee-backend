import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Message extends Document {
  @Prop({ type: String, ref: 'User', required: true })
  senderId: string;

  @Prop({ type: String, ref: 'User', required: true })
  receiverId: string;

  @Prop({ required: true })
  message: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
