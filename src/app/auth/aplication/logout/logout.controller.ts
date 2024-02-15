import { Body, Controller, Inject, Post } from "@nestjs/common";
import { LogoutRequest } from "./logout.request";
import { LogoutUseCase } from "./logout.usecase";

@Controller()
export class LogoutController {
  constructor(
    @Inject(LogoutUseCase)
    private readonly useCase: LogoutUseCase,
  ) {}

  @Post("/logout")
  logout(@Body() request: LogoutRequest) {
    const { accessToken } = request;
    this.useCase.execute(accessToken);
    return {
      message: "Logout sucessfully",
    };
  }
}
