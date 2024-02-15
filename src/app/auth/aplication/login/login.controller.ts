import { Body, Controller, Inject, Post } from "@nestjs/common";
import { LoginRequest } from "./login.request";
import { LoginUseCase } from "./login.usecase";

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
}
