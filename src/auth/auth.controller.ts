import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDTO } from './dto/credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) credentials: CredentialsDTO): Promise<void> {
    return this.authService.signUp(credentials);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) credentials: CredentialsDTO,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(credentials);
  }
}
