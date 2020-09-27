import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '12sa',
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.userRepository.findOne({
      username: payload.username,
    });
    if (!user) {
      throw new UnauthorizedException('user not found');
    }
    return user;
  }
}
