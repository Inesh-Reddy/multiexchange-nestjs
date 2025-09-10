import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@repo/dbschema';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}
  async getAllUsers(): Promise<User[]> {
    return this.userRepo.find();
  }
  async createUser(name: { name: string }): Promise<User> {
    const user: User = await this.userRepo.create(name);
    return await this.userRepo.save(user);
  }
}
