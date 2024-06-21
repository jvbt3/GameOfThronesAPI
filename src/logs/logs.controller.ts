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
import { LogsService } from './logs.service';
import { CreateLogDto } from './dto/create-log.dto';
import { AuthGuard } from 'src/auth/auth.guards';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createLogDto: CreateLogDto) {
    return this.logsService.create(createLogDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.logsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.logsService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLogDto: CreateLogDto) {
    return this.logsService.update(id, updateLogDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logsService.remove(id);
  }
}
