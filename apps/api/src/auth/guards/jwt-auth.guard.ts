import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { IS_PUBLIC_KEY } from '../decorators/is-public';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    // const token = request.headers.authorization?.split(' ')[1];
    const token = request.cookies?.Authentication;

    if (!token) {
      throw new UnauthorizedException();
    }

    if (this.authService.isTokenBlacklisted(token)) {
      throw new UnauthorizedException('Invalid token');
    }

    return super.canActivate(context);
  }
}
