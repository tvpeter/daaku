import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// this calls the strategy used
export class LocalAuthGuard extends AuthGuard('local') {}
