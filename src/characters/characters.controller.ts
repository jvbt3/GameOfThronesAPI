import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { AuthGuard } from '../auth/auth.guards';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @UseGuards(AuthGuard)
  @Post('/create')
  async create() {
    try {
      return await this.charactersService.create();
    } catch (error) {
      throw new HttpException(
        'Failed to create character',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthGuard)
  @Post()
  async createOne(@Body() createCharacterDto: CreateCharacterDto) {
    try {
      return await this.charactersService.createOne(createCharacterDto);
    } catch (error) {
      throw new HttpException(
        'Falha ao criar personagem',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    try {
      return await this.charactersService.findAll();
    } catch (error) {
      throw new HttpException(
        'Falha ao buscar personagens',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.charactersService.findOne(+id);
    } catch (error) {
      throw new HttpException(
        'Personagem não encontrado',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() createCharacterDto: CreateCharacterDto,
  ) {
    try {
      return await this.charactersService.update(+id, createCharacterDto);
    } catch (error) {
      throw new HttpException(
        'Falha ao alterar personagem',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.charactersService.remove(+id);
    } catch (error) {
      throw new HttpException(
        'Falha ao apagar personagem',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
