import { Body, Controller, Inject, Post } from "@nestjs/common";
import { RecoverPasswordUseCase } from "./recover-password.usecase";
import { RecoverPasswordRequest } from "./recover-password.request";
import { RecoverPasswordCommand } from "./recover-password.command";
import { userPath } from "../../../shared/routes";

@Controller(userPath)
export class RecoverPasswordController {
  constructor(
    @Inject(RecoverPasswordUseCase)
    private readonly useCase: RecoverPasswordUseCase,
  ) {}

  @Post("recover-password")
  async recoverPassword(@Body() request: RecoverPasswordRequest) {
    await this.useCase.execute(new RecoverPasswordCommand(request));
    return { message: "Password succesfully reset!" };
  }
}
