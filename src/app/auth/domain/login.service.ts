import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { UserService } from "../../user/domain/user.service";
import { isValidPassword } from "./encoder.service";
import { genId } from "../../shared/utils/gen-id";
import { Credentials } from "../aplication/login/login.request";
import { Token, TokenService } from "./token.service";
import { User } from "../../user/domain/user.interface";
import { ID } from "../../shared/abstract-repository/repository.interface";
import { sessionService } from "./session.service";
import { sanitizeEmail } from "../../shared/utils/string";
import { Account } from "src/app/account/domain/account.interface";
import { ctxSrv } from "src/app/shared/context.service";

export interface LoginResponse {
  accessToken: Token;
  refreshToken: Token;
  session: string;
}

/**
 * Service to handle the LOGIN
 */
@Injectable()
export class LoginService {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,

    @Inject(TokenService)
    private readonly tokenService: TokenService,
  ) {}

  private async findUser(email: string) {
    const existingUser = await this.userService.findUserByEmail(email);
    if (!existingUser)
      throw new BadRequestException(
        `Failed Loing. User with email [${email}] was not found.`,
      );
    return existingUser;
  }

  private async validatePassword(password: string, existingUser: User) {
    const validPass = await isValidPassword(password, existingUser.password);
    if (!validPass) {
      const user = await this.userService.incFailedLogin(existingUser.id);
      sessionService.atempToDisableUserLogin(user);
      throw new BadRequestException(`Failed Loing. Incorrect password.`);
    }
    if (existingUser.failedLogin != 0)
      await this.userService.resetFailedLogin(existingUser.id);
  }

  private verifyLogin(userID: ID) {
    if (!sessionService.canLogin(userID)) {
      throw new BadRequestException(
        "The login action for that user is temporaly disable, try later.",
      );
    }
  }

  async login(credentials: Credentials): Promise<LoginResponse> {
    const { password } = credentials;
    const email = sanitizeEmail(credentials.email);

    const existingUser = await this.findUser(email);
    this.verifyLogin(existingUser.id);
    await this.validatePassword(password, existingUser);

    console.log(`Loging wiht email ->  ${email}`);
    const session = genId();
    this.tokenService.setSession(session);

    return {
      accessToken: this.tokenService.getAccessToken(existingUser),
      refreshToken: this.tokenService.getRefreshToken(existingUser),
      session,
    };
  }

  async loginAccount(account: Account): Promise<LoginResponse> {
    const closeSession = () => {
      const session = ctxSrv.getSession();
      const userId = ctxSrv.getUserId();

      console.log({ session, userId });
      console.log(`Close session [${session}] of userid [${userId}]`);
      sessionService.unRegisterSession(session);
    };

    const existingUser = await this.userService.findByIdOrFail(
      ctxSrv.getUserId(),
    );

    closeSession();

    const session = genId();
    this.tokenService.setSession(session);
    return {
      accessToken: this.tokenService.getAccessToken(existingUser, account),
      refreshToken: this.tokenService.getRefreshToken(existingUser),
      session,
    };
  }
}
