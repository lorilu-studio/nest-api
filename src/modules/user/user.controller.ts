import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<{ items: User[]; total: number }> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  async create(@Body() user: Partial<User>): Promise<User> {
    return this.userService.create(user);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() user: Partial<User>): Promise<User> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }
}