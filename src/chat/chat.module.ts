// chat.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { Chat, ChatSchema } from '../schemas/chat.schema';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Import ConfigModule and ConfigService

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    ConfigModule, // Import ConfigModule to access environment variables
    JwtModule.registerAsync({
      imports: [ConfigModule], // Import ConfigModule
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Get the JWT secret from the environment
        signOptions: { expiresIn: '60s' }, // Optional: specify token expiration
      }),
      inject: [ConfigService], // Inject ConfigService to use in the factory
    }),
  ],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
