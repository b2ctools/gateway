import { Inject, Injectable } from "@nestjs/common";

import { config } from "../../config/config.service";
import { LoginUseCase } from "./login/login.usecase";
import { LogoutUseCase } from "./logout/logout.usecase";
import { RefreshTokenUseCase } from "./refresh-token/refresh-token.usecase";

@Injectable()
export class TestingAuth {
  constructor(
    @Inject(LoginUseCase) private readonly loginUC: LoginUseCase,
    @Inject(LogoutUseCase) private readonly loginOutUC: LogoutUseCase,
    @Inject(RefreshTokenUseCase)
    private readonly refreshTokenUC: RefreshTokenUseCase,
  ) {}

  async onApplicationBootstrap() {
    if (
      config.get("enviroment") === "local" &&
      config.get("userRepo") === "mock"
    ) {
      setTimeout(async () => {
        return;
        // log in
        const loggin = await this.loginUC.execute({
          email: "elmer@email.com",
          password: "12345",
        });

        console.log(loggin);
        const accessToken = loggin.accessToken.token;
        const refreshToken = loggin.refreshToken.token;

        // refreshing the token
        const refreshed = await this.refreshTokenUC.execute({
          accessToken,
          refreshToken,
        });
        const newAccessToken = refreshed.accessToken.token;

        //log out
        this.loginOutUC.execute(newAccessToken);
      }, 1000);
    }
  }
}
