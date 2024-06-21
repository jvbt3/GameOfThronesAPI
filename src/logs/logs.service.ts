import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { Log } from './entities/log.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LogsService {
  constructor(@InjectModel(Log.name) private logModel: Model<Log>) {}

  create(createLogDto: CreateLogDto) {
    return this.logModel.create(createLogDto);
  }

  findAll() {
    return this.logModel.find();
  }

  findById(id: string) {
    return this.logModel.findById(id);
  }

  update(id: string, updateLogDto: UpdateLogDto) {
    return this.logModel.findByIdAndUpdate(id, updateLogDto);
  }

  remove(id: string) {
    return this.logModel.findByIdAndDelete(id);
  }
}
