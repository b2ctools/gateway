import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { LoginService } from "../../domain/login.service";
import { sessionService } from "../../domain/session.service";
import { Credentials } from "./login.request";
import { UserService } from "../../../user/domain/user.service";

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(LoginService)
    private readonly loginService: LoginService,

    @Inject(UserService)
    private readonly userService: UserService,
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
}
