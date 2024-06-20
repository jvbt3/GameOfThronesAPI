import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';

@Injectable()
export class LogsService {
  private log: CreateLogDto[] = [];

  create(createLogDto: CreateLogDto) {
    this.log.push(createLogDto);
    return createLogDto;
  }

  findAll() {
    return this.log;
  }

  findOne(id: string) {
    return this.log.find((i) => i.id == id);
  }

  update(id: string, updateLogDto: UpdateLogDto) {
    const indexObj = this.log.findIndex((i) => i.id == id);
    this.log[indexObj] = updateLogDto;
    return updateLogDto;
  }

  remove(id: string) {
    const indexObj = this.log.findIndex((i) => i.id == id);
    this.log.splice(indexObj, 1);
    return 'Remove success!';
  }
}
