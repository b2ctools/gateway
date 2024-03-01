import { BadRequestException, Inject, Injectable, forwardRef } from "@nestjs/common";
import { LoginService } from "../../domain/login.service";
import { sessionService } from "../../domain/session.service";
import { Credentials } from "./login.request";
import { UserService } from "../../../user/domain/user.service";
import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { AccountService } from "src/app/account/domain/account.service";
import { Account } from "src/app/account/domain/account.interface";
import { ctxSrv } from "src/app/shared/context.service";

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
        `Failed Login. User with email [${email}] was not found.`,
      );
    return existingUser;
  }

  async execute(credencials: Credentials) {
    const login = await this.loginService.login(credencials);
    const user = await this.findUser(credencials.email);
    sessionService.registerSession(user.id, login.session);

    return login;
  }

  private validateAccount(account: Account) {
    if (!account.isActive){
      throw new BadRequestException(
        `Failed Login. Account with id [${account.id}] is not active.`,
      );
    }

    if (account.type === "store" && !account.storeId){
      throw new BadRequestException(
        `Failed Login. Account with id [${account.id}] is not associated with a store.`,
      );
    }

    if (account.type === "tenant" && !account.tenantId){
      throw new BadRequestException(
        `Failed Login. Account with id [${account.id}] is not associated with a tenant.`,
      );
    }

    if (account.userId != ctxSrv.getUserId()){
      throw new BadRequestException(
        `Failed Login. Account with id [${account.id}] does not belong to the user.`,
      );
    }

  }

  async loginAccount(accountId: ID) {
    const account = await this.accountService.findByIdOrFail(accountId);
    this.validateAccount(account);
    const login = await this.loginService.loginAccount(account);
    sessionService.registerSession(account.userId, login.session);

    return login;
  }
}
