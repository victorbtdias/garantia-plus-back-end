import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() data: CreateUserDto): Promise<User> {
    return this.usersService.create(data);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('current')
  @UseGuards(JwtAuthGuard)
  findCurrent(@Req() req: Request) {
    const { userId } = req.user as { userId: number };
    return this.usersService.findById(userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findById(@Param('id') id: string): Promise<User> {
    return this.usersService.findById(+id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<User> {
    return this.usersService.update(+id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(+id);
  }
}
