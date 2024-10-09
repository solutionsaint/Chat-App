export class CreateChatDto {
    chatId: string;
    participants: string[];
  }
  
  export class SendMessageDto {
    chatId: string;
    sender: string;
    message: string;
  }
  
  export class GetChatDto {
    chatId: string;
  }
  