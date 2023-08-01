import { UnauthorizedException, createParamDecorator } from '@nestjs/common';
import { TelegrafExecutionContext } from 'nestjs-telegraf';

export const CookieGetter = createParamDecorator(
  async (data: string, context: TelegrafExecutionContext): Promise<string> => {
    const request = context.switchToHttp().getRequest();
    const refreshToken = request.cookies[data];
    if (!refreshToken) {
      throw new UnauthorizedException('ton');
    }
    return refreshToken;
  },
);
