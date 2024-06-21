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
    const charactersFiltered = [];
    const charactersNoInserted = [];

    for (const character of characters) {
      const exists = await this.existsCharacter(character.id);

      if (!exists) {
        charactersFiltered.push(character);
      } else {
        charactersNoInserted.push({
          id: character.id,
          firstName: character.firstName,
          message: 'Personagem já existe na base de dados.',
        });
      }
    }

    const charactersInserted =
      await this.characterModel.create(charactersFiltered);

    if (charactersFiltered.length > 0) {
      return [...charactersInserted, ...charactersNoInserted];
    } else {
      return charactersNoInserted;
    }
  }

  async existsCharacter(id: number): Promise<boolean> {
    const findCharacter = await this.characterModel.findOne({ id });

    return !!findCharacter;
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

  async getCharacter(): Promise<any[]> {
    let response = await fetch('https://thronesapi.com/api/v2/Characters');
    return await response.json();
  }
}
