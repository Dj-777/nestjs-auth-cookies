import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './Entity/user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private readonly UserRepository: Repository<User>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async register(userdto: UserDto): Promise<any> {
    const CheckEmail = await this.UserRepository.findOne({
      where: { email: userdto.email },
    });
    if (CheckEmail) {
      return {
        Message: `${userdto.email} is Already Exists Please Use Another`,
      };
    } else {
      return await this.UserRepository.save(userdto);
    }
  }

  async findOne(condition: any): Promise<User> {
    return this.UserRepository.findOne(condition);
  }
}
