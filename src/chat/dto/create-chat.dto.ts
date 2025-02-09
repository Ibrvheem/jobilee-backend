import { IsMongoId, IsString } from 'class-validator';

export class CreateChatDto {
  @IsMongoId()
  receiverId: string;

  @IsMongoId()
  senderId: string;

  @IsString()
  message: string;
}
