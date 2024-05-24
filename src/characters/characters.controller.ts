import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { AuthGuard } from '../auth/auth.guards';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @UseGuards(AuthGuard)
  @Post('/create')
  create() {
    return this.charactersService.create();
  }

  @UseGuards(AuthGuard)
  @Post()
  createOne(@Body() createCharacterDto: CreateCharacterDto) {
    return this.charactersService.createOne(createCharacterDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.charactersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.charactersService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() createCharacterDto: CreateCharacterDto,
  ) {
    return this.charactersService.update(+id, createCharacterDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.charactersService.remove(+id);
  }
}
