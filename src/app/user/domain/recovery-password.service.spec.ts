import * as dotenv from "dotenv";
dotenv.config();
import { JwtService } from "@nestjs/jwt";
import { TokenService } from "../../auth/domain/token.service";
import { EmailService } from "../../notification/domain/email.service";
import { RecoveryPasswordService } from "./recovery-password.service";
const jwt = new JwtService({
  secret: "secret",
});
const RECOVERY_CODE = "12345";
const mockedUserService = {
  getAndVerifyUser: jest.fn().mockReturnValue({
    email: "test@email.com",
    recoveryPasswordCode: RECOVERY_CODE,
  }),
  setPasswordRecoveryCode: jest.fn(),
  resetPassword: jest.fn(),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

const verifyUserSpy = jest.spyOn(mockedUserService, "getAndVerifyUser");
const setPassRecoveryCodeSpy = jest.spyOn(
  mockedUserService,
  "setPasswordRecoveryCode",
);
const resetPasswordSpy = jest.spyOn(mockedUserService, "resetPassword");

const getRecoveryTokenSpy = jest.spyOn(
  TokenService.prototype,
  "getRecoveryPasswordToken",
);
const validateRecoveryTokenSpy = jest.spyOn(
  TokenService.prototype,
  "validateRecoveryPasswordToken",
);
const sendEmailSpy = jest.spyOn(EmailService.prototype, "send");

const generateCodeSpy = jest.spyOn(
  RecoveryPasswordService.prototype,
  "generateCode",
);

describe("RECOVERY PASSWORD TEST SUTIE", () => {
  test("it should send recovery code", async () => {
    const tokenService = new TokenService(jwt);
    const emailService = new EmailService();
    const srv = new RecoveryPasswordService(
      mockedUserService,
      tokenService,
      emailService,
    );

    await srv.sendRecoveryPasswordToken("test@email.com");

    expect(verifyUserSpy).toHaveBeenCalledTimes(1);
    expect(setPassRecoveryCodeSpy).toHaveBeenCalledTimes(1);
    expect(getRecoveryTokenSpy).toHaveBeenCalledTimes(1);
    expect(sendEmailSpy).toHaveBeenCalledTimes(1);
  });

  test("it should validate recovery code", async () => {
    const tokenService = new TokenService(jwt);
    const emailService = new EmailService();
    const srv = new RecoveryPasswordService(
      mockedUserService,
      tokenService,
      emailService,
    );

    generateCodeSpy.mockReturnValue(RECOVERY_CODE);

    const email = "test@email.com";
    const newPassword = "new password";
    const { token: recoveryToken } = await srv.sendRecoveryPasswordToken(email);
    await srv.recoverPassword(email, recoveryToken, newPassword);

    expect(verifyUserSpy).toHaveBeenCalledTimes(3);
    expect(validateRecoveryTokenSpy).toHaveBeenCalledTimes(1);
    expect(resetPasswordSpy).toHaveBeenCalledTimes(1);
  });

  test("it should throw error if the code do not match", async () => {
    const tokenService = new TokenService(jwt);
    const emailService = new EmailService();
    const srv = new RecoveryPasswordService(
      mockedUserService,
      tokenService,
      emailService,
    );

    generateCodeSpy.mockReturnValue(RECOVERY_CODE);
    verifyUserSpy.mockReturnValue({
      email: "test@email.com",
      recoveryPasswordCode: undefined,
    });

    const email = "test@email.com";
    const newPassword = "new password";
    const { token: recoveryToken } = await srv.sendRecoveryPasswordToken(email);
    console.log({ recoveryToken });
    try {
      await srv.recoverPassword(email, recoveryToken, newPassword);
    } catch (error) {
      expect(error.message).toBe(
        "Error Validating Recovery Password. Code missmatch.",
      );
    }
  });
});
