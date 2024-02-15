import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { TokenService } from "./token.service";
import { sessionService } from "./session.service";
import { UserService } from "../../user/domain/user.service";
import { IRefreshToken } from "../aplication/refresh-token/refresh-token.request";
import { genId } from "../../shared/utils/gen-id";
import { LoginResponse } from "./login.service";

@Injectable()
export class RefreshTokenService {
  constructor(
    @Inject(TokenService)
    private readonly tokenService: TokenService,

    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  async refreshToken(request: IRefreshToken): Promise<LoginResponse> {
    const { accessToken, refreshToken } = request;
    const accessPayload = this.tokenService.validateAccessToken(accessToken);
    const { email, session: accessTokenSession, userId } = accessPayload;

    const refreshPayload = this.tokenService.validateRefreshToken(refreshToken);
    const { session: refreshTokenSession } = refreshPayload;

    if (accessTokenSession != refreshTokenSession) {
      throw new BadRequestException(
        `Refresh Token Error. Token sessions do not match.`,
      );
    }

    if (!sessionService.isValidSession(userId, accessTokenSession)) {
      throw new BadRequestException(
        "Refresh Token Error. Is not an active session.",
      );
    }

    sessionService.unRegisterSession(accessTokenSession);

    const user = await this.userService.findUserByEmail(email);

    const session = genId();
    this.tokenService.setSession(session);

    return {
      accessToken: this.tokenService.getAccessToken(user),
      refreshToken: this.tokenService.getRefreshToken(user),
      session,
    };
  }
}
