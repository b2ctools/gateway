import { BadRequestException, Inject, Injectable, forwardRef } from "@nestjs/common";
import { LoginService } from "../../domain/login.service";
import { sessionService } from "../../domain/session.service";
import { Credentials } from "./login.request";
import { UserService } from "../../../user/domain/user.service";
import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { AccountService } from "src/app/account/domain/account.service";

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(LoginService)
    private readonly loginService: LoginService,

    @Inject(UserService)
    private readonly userService: UserService,

    @Inject(forwardRef(() => AccountService))
    private readonly accountService: AccountService,
  ) {}

  private async findUser(email: string) {
    const existingUser = await this.userService.findUserByEmail(email);
    if (!existingUser)
      throw new BadRequestException(
        `Failed Loing. User with email [${email}] was not found.`,
      );
    return existingUser;
  }

  async execute(credencials: Credentials) {
    const login = await this.loginService.login(credencials);
    const user = await this.findUser(credencials.email);
    sessionService.registerSession(user.id, login.session);

    return login;
  }

  async loginAccount(accountId: ID) {
    const account = await this.accountService.findByIdOrFail(accountId);
    const login = await this.loginService.loginAccount(account);
    sessionService.registerSession(account.userId, login.session);

    return login;
  }
}
