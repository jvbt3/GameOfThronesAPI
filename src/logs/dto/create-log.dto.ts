import { IsNumber, IsString } from 'class-validator';

export class CreateLogDto {
  @IsNumber()
  id?: string;

  @IsNumber()
  statusCode: number;

  @IsString()
  method: string;

  @IsString()
  route: string;

  @IsString()
  message: string;

  @IsString()
  type: string;
}
