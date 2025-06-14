import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(page: number = 1, size: number = 10): Promise<{items: User[], total: number}> {
    const [items, total] = await this.userRepository.findAndCount({
      skip: (page - 1) * size,
      take: size
    });
    return { items, total };
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`用户ID ${id} 不存在`);
    }
    return user;
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async update(id: number, userData: Partial<User>): Promise<User> {
    await this.findOne(id); // 确保用户存在
    await this.userRepository.update(id, userData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`用户ID ${id} 不存在`);
    }
  }
}