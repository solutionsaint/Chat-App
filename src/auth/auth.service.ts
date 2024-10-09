import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2'; // Make sure to install argon2
import { UserService } from '../users/user.service'; 
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await argon.hash(createUserDto.password);
    const createdUser = new this.userModel({
      username: createUserDto.username,
      email: createUserDto.email,
      password: hashedPassword,
    });
    return createdUser.save();
  }

  async login(email: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new Error('User not found'); // Handle this with a proper exception
    }

    const isPasswordValid = await argon.verify(user.password, password);
    if (!isPasswordValid) {
      throw new Error('Invalid password'); // Handle this with a proper exception
    }

    const payload = { username: user.username, email: user.email };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
