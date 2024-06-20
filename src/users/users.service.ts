import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/users.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await this.userHash(createUserDto.password);
    return this.userModel.create(createUserDto);
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(username: string) {
    return this.userModel.findOne({ username });
  }

  findById(id: number) {
    return this.userModel.findOne({ id });
  }

  update(id: number, createUserDto: CreateUserDto) {
    return this.userModel.updateOne({ id }, createUserDto);
  }

  remove(id: number) {
    return this.userModel.deleteOne({ id });
  }

  private async userHash(pass: string) {
    const saltOrRound = 10;
    const passHashed = bcrypt.hash(pass, saltOrRound);
    return passHashed;
  }
}
