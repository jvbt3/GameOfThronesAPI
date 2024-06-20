import { IsNumber, IsString } from 'class-validator';

export class CreateCharacterDto {
  @IsNumber()
  id: number;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  fullName: string;

  @IsString()
  title: string;

  @IsString()
  familly: string;

  @IsString()
  image: string;

  @IsString()
  imageUrl: string;
}
