import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { UserService } from "./user.service";
import { Token, TokenService } from "../../auth/domain/token.service";
import { genId } from "../../shared/utils/gen-id";
import { EmailService } from "../../notification/domain/email.service";

@Injectable()
export class RecoveryPasswordService {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,

    @Inject(TokenService)
    private readonly tokenService: TokenService,

    @Inject(EmailService)
    private readonly emailService: EmailService,
  ) {}

  generateCode(): string {
    return genId().slice(0, 6);
  }

  private getRecoveryPasswordEmailTemplate(token: Token) {
    const { token: code, expiresAt } = token;
    return `
        Your recovery password token is:
        
        >>>> ${code} <<<<

        this token will expires at ${expiresAt}
    `;
  }

  async sendRecoveryPasswordToken(email: string) {
    const user = await this.userService.getAndVerifyUser(email);
    const code = this.generateCode();
    await this.userService.setPasswordRecoveryCode(user.email, code);
    const token = this.tokenService.getRecoveryPasswordToken(code);
    const template = this.getRecoveryPasswordEmailTemplate(token);
    this.emailService.send(email, template);
    return token;
  }

  async recoverPassword(
    email: string,
    recoveryPasswordToken: string,
    newPassword: string,
  ) {
    const user = await this.userService.getAndVerifyUser(email);
    const { code } = this.tokenService.validateRecoveryPasswordToken(
      recoveryPasswordToken,
    );

    if (user.recoveryPasswordCode != code) {
      throw new BadRequestException(
        `Error Validating Recovery Password. Code missmatch.`,
      );
    }

    await this.userService.resetPassword(email, newPassword);
  }
}
