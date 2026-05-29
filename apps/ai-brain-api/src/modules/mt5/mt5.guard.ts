import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class Mt5Guard
  implements CanActivate
{
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const request =
      context.switchToHttp().getRequest();

    const secret =
      request.headers['x-albi-secret'];

    if (
      secret !==
      process.env.ALBI_MT5_SECRET
    ) {
      throw new UnauthorizedException(
        'Invalid MT5 Secret',
      );
    }

    return true;
  }
}