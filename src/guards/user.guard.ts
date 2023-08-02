import { JwtService } from '@nestjs/jwt/dist';
import {
  Injectable,
  UnauthorizedException,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { User } from '../users/models/user.model';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('User unathored');
    }
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];

    if (bearer != 'Bearer' || !token) {
      throw new UnauthorizedException('User unathored');
    }

    async function verify(token: string, jwtService: JwtService) {
      const user: Partial<User> = await jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });
      if (!user) {
        throw new UnauthorizedException('invaled token proved');
      }
      if (!user.is_active) {
        throw new UnauthorizedException('User not active');
      }
      return true;
    }
    return verify(token, this.jwtService);
  }
}
