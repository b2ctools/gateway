import { RecoverPasswordRequest } from "./recover-password.request";

export class RecoverPasswordCommand {
  email: string;
  recoveryPasswordToken: string;
  newPassword: string;

  constructor(request: RecoverPasswordRequest) {
    const { email, recoveryPasswordToken, newPassword } = request;
    this.email = email;
    this.recoveryPasswordToken = recoveryPasswordToken;
    this.newPassword = newPassword;
  }
}
