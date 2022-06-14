import { NestMiddleware, Injectable } from '@nestjs/common';
import { JWTUtils } from '../common/jwt-utils';
import { ConfigService } from '../common/services/config.service';
import { ApiError } from '../common/classes/api-error';
import { ErrorCode } from '../common/constants/errors';

@Injectable()
export class ExtractUserMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: any, res: any, next: () => void) {
    const authHeaders = req.headers.authorization;
    if (
      authHeaders !== 'undefined' &&
      authHeaders &&
      (authHeaders as string).split(' ')[1]
    ) {
      const token = (authHeaders as string).split(' ')[1];
      JWTUtils.verifyAsync(token, this.configService.jwtCore.accessTokenSecret)
        .then((decoded) => {
          req.user = decoded;
        })
        .finally(() => {
          next();
        })
        .catch(() => {
          return res.json(new ApiError(ErrorCode.INVALID_TOKEN));
        });
    } else {
      next();
    }
  }
}
