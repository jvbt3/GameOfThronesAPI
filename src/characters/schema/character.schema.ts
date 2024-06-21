import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IsString } from 'class-validator';

export type CharacterDocument = HydratedDocument<Character>;

@Schema()
export class Character {
  @Prop()
  id: number;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  fullName: string;

  @Prop()
  title: string;

  @Prop()
  familly: string;

  @Prop()
  image: string;

  @Prop()
  imageUrl: string;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
