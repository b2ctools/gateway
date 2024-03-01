import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { LoginService } from "./domain/login.service";
import { UserModule } from "../user/user.module";
import { config } from "../config/config.service";
import { LoginController } from "./aplication/login/login.controller";
import { TokenService } from "./domain/token.service";
import { LoginUseCase } from "./aplication/login/login.usecase";
import { LogoutController } from "./aplication/logout/logout.controller";
import { LogoutUseCase } from "./aplication/logout/logout.usecase";
import { RefreshTokenService } from "./domain/refresh-token.service";
import { RefreshTokenUseCase } from "./aplication/refresh-token/refresh-token.usecase";
import { RefreshController } from "./aplication/refresh-token/refresh-controller";
import { TestingAuth } from "./aplication/test-auth._test_";
import { AccountModule } from "../account/account.module";

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => AccountModule),
    JwtModule.register({
      secret: config.get("jwtSecret") as string,
    }),
  ],
  controllers: [LoginController, LogoutController, RefreshController],
  providers: [
    LoginUseCase,
    LogoutUseCase,
    RefreshTokenUseCase,
    LoginService,
    TokenService,
    RefreshTokenService,
    TestingAuth,
  ],
  exports: [LoginService, TokenService],
})
export class AuthModule {}
