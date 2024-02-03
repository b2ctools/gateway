import { Inject, Injectable } from '@nestjs/common';
import { TokenService } from '../../domain/token.service';
import { sessionService } from '../../domain/session.service';

@Injectable()
export class LogoutUseCase {
  constructor(
    @Inject(TokenService)
    private readonly tokenService: TokenService,

  ) {}

  execute(accessToken: string): boolean {
    const { session, userId, email } = this.tokenService.validateAccessToken(accessToken);
    console.log({ session, userId, email })
    console.log(`Login out userId [${userId}] with email [${email}]`)
    sessionService.unRegisterSession(session);
    return true;
  }
}
