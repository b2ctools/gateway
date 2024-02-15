import { Body, Controller, Inject, Post } from "@nestjs/common";
import { SendRecoveryTokenUseCase } from "./send-recovery-token.usecase";
import { SendRecoveryPasswordCodeRequest } from "./send-recovery-token.request";
import { userPath } from "../../../shared/routes";

@Controller(userPath)
export class SendRecoveryTokenController {
  constructor(
    @Inject(SendRecoveryTokenUseCase)
    private readonly useCase: SendRecoveryTokenUseCase,
  ) {}

  @Post("send-recovery-password")
  async sendRecoveryPassword(@Body() request: SendRecoveryPasswordCodeRequest) {
    const { email } = request;
    await this.useCase.execute(email);
    return {
      message: `Recovery password token succesfuly sent to ${email}.`,
    };
  }
}
