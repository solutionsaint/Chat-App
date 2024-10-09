import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI), 
    AuthModule,
    UserModule,
    ChatModule
  ],
})
export class AppModule {}
