// dto/create-chat.dto.ts
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateChatDto {
  @IsNotEmpty()
  @IsString()
  chatId: string;

  @IsArray()
  @IsNotEmpty({ each: true })
  participants: string[];
}
