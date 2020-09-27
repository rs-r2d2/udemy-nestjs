import { Repository, EntityRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { CredentialsDTO } from './dto/credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  SALT_ROUNDS = 10;
  async createUser(credentials: CredentialsDTO): Promise<void> {
    const user = new User();
    user.username = credentials.username;
    user.password = await bcrypt.hash(credentials.password, this.SALT_ROUNDS);
    try {
      await user.save();
    } catch (e) {
      if (e.code == 23505) {
        throw new ConflictException({
          statusCode: 422,
          message: 'Username already exists',
        });
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUser(credentials: CredentialsDTO): Promise<string> {
    const { username, password } = credentials;

    const user = await this.findOne({
      select: ['id', 'password', 'username'],
      where: {
        username,
      },
    });
    if (user && (await this.validatePassword(user.password, password))) {
      return user.username;
    }
    return null;
  }

  async validatePassword<H extends string, P extends string>(
    passwordHash: H,
    password: P,
  ): Promise<boolean> {
    return await bcrypt.compare(password, passwordHash);
  }
}
