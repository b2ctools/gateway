import { Body, Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { LoginRequest } from "./login.request";
import { LoginUseCase } from "./login.usecase";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

@Controller()
export class LoginController {
  constructor(
    @Inject(LoginUseCase)
    private readonly useCase: LoginUseCase,
  ) {}

  @Post("/login")
  async login(@Body() credencials: LoginRequest) {
    return await this.useCase.execute(credencials);
  }

  @Get("/login-account/:accountId")
  async loginAccount(@Param("accountId") accountId: ID) {
    return await this.useCase.loginAccount(accountId);
  }
}
