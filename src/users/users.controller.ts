import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/auth.guards';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.usersService.create(createUserDto);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_GATEWAY,
        error: 'Could not create user',
      }, HttpStatus.BAD_GATEWAY, {
        cause: error,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    try {
      return this.usersService.findAll();
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_GATEWAY,
        error: 'Could not retrieve users',
      }, HttpStatus.BAD_GATEWAY, {
        cause: error,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Get('/nome/:nome')
  findOne(@Param('nome') nome: string) {
    try {
      return this.usersService.findOne(nome);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'User not found',
      }, HttpStatus.NOT_FOUND, {
        cause: error,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findUser(@Param('id') id: string) {
    try {
      return this.usersService.findById(+id);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'User not found',
      }, HttpStatus.NOT_FOUND, {
        cause: error,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() createUserDto: CreateUserDto) {
    try {
      return this.usersService.update(+id, createUserDto);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Could not update user',
      }, HttpStatus.BAD_REQUEST, {
        cause: error,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.usersService.remove(+id);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Could not delete user',
      }, HttpStatus.BAD_REQUEST, {
        cause: error,
      });
    }
  }
}
