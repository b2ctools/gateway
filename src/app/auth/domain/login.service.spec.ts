import * as dotenv from "dotenv";
dotenv.config();
import { describe } from "node:test";
import { LoginService } from "./login.service";
import { UserRole, UserStatus } from "../../user/domain/user.interface";
import { encodePassword } from "./encoder.service";

const mockedUser = () =>
  Promise.resolve({
    id: "45e9c429f70ef927e3e219214dc6c203",
    name: "Elmer Entenza",
    email: "elmer@email.com",
    password: encodePassword("12345"),
    tenantId: 1,
    status: UserStatus.ENABLED,
    role: UserRole.USER,
  });

const mockedUserService = {
  findUserByEmail: jest.fn().mockReturnValue(mockedUser()),
  resetFailedLogin: jest.fn().mockReturnValue(mockedUser()),
  findByIdOrFail: jest.fn().mockReturnValue(mockedUser()),
  incFailedLogin: jest.fn().mockReturnValue(mockedUser()),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

const mockedTokenService = {
  getAccessToken: jest.fn().mockReturnValue(true),
  getRefreshToken: jest.fn().mockReturnValue(true),
  setSession: jest.fn().mockReturnValue("session--0000"),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

describe("LOGING SERVICE TEST SUITE", () => {
  // should call repo.findeOneById with the correct id

  test("it should make login", async () => {
    const srv = new LoginService(mockedUserService, mockedTokenService);

    const loggin = await srv.login({
      email: "elmer@email.com",
      password: "12345",
    });

    const { accessToken, refreshToken } = loggin;

    expect(accessToken).toBeTruthy();
    expect(refreshToken).toBeTruthy();
  });

  test("it should not make login with wrong password", async () => {
    const srv = new LoginService(mockedUserService, mockedTokenService);

    try {
      await srv.login({
        email: "elmer@email.com",
        password: "wrong-password",
      });
    } catch (error) {
      expect(error.message).toBe("Failed Loing. Incorrect password.");
    }
  });
});
