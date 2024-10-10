import { IsNotEmpty, IsString } from 'class-validator';

export class SendMessageDto {
  @IsNotEmpty()
  @IsString()
  chatId: string;

  @IsNotEmpty()
  @IsString()
  sender: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
