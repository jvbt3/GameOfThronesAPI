import { Module } from '@nestjs/common';
import { LogsService } from './logs.service';
import { LogsController } from './logs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Log, LogSchema } from './schema/log.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }])],
  controllers: [LogsController],
  providers: [LogsService],
  exports: [LogsService],
})
export class LogsModule {}
