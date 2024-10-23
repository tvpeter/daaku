import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const jwtConstants = {
  secret: configService.getOrThrow('JWT_SECRET'),
  expiresIn: configService.getOrThrow('JWT_TOKEN_EXPIRATION_MS'),
};
