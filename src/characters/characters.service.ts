import { Injectable, UseInterceptors } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Character } from './schema/character.schema';
import { Model } from 'mongoose';
import { LoggingInterceptor } from '../common/interceptor/loggin.interceptor';

@Injectable()
@UseInterceptors(LoggingInterceptor)
export class CharactersService {
  constructor(
    @InjectModel(Character.name) private characterModel: Model<Character>,
  ) {}

  async create() {
    const characters = await this.getCharacter();
    return this.characterModel.create(characters);
  }

  createOne(createCharacterDto: CreateCharacterDto) {
    return this.characterModel.create(createCharacterDto);
  }

  findAll() {
    return this.characterModel.find();
  }

  findOne(id: number) {
    return this.characterModel.findOne({ id });
  }

  update(id: number, createCharacterDto: CreateCharacterDto) {
    return this.characterModel.updateOne({ id }, createCharacterDto);
  }

  remove(id: number) {
    return this.characterModel.deleteOne({ id });
  }

  async getCharacter() {
    let response = await fetch('https://thronesapi.com/api/v2/Characters');
    return await response.json();
  }
}
