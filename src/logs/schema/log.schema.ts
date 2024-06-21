import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<Log>;

@Schema()
export class Log {
  @Prop()
  id: number;

  @Prop()
  statusCode: number;

  @Prop()
  method: string;

  @Prop()
  route: string;

  @Prop()
  message: string;
}

export const LogSchema = SchemaFactory.createForClass(Log);
