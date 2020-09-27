import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CredentialsDTO } from './dto/credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  signUp(credentials: CredentialsDTO): Promise<void> {
    return this.userRepository.createUser(credentials);
  }

  async signIn(credentials: CredentialsDTO): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validateUser(credentials);
    if (!username) {
      throw new UnauthorizedException(`Invalid credentials`);
    }

    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }
}
