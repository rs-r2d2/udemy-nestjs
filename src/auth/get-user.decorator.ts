import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

export const GetUser = createParamDecorator(
  <D extends any, C extends ExecutionContext>(data: D, ctx: C): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
