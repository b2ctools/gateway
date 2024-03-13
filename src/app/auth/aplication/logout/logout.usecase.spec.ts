import * as dotenv from "dotenv";
dotenv.config();
import { LogoutUseCase } from "./logout.usecase";
import { sessionService } from "../../domain/session.service";

const mockedTokenService = {
  validateAccessToken: jest.fn(),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

describe("LOGOUT SUITE TEST", () => {
  test("it should logout properly", () => {
    const session = "session Id";
    const userId = "user Id";
    const email = "testing@email.com";
    const accessToken = "access token";
    mockedTokenService.validateAccessToken.mockReturnValue({
      session,
      userId,
      email,
    });
    const tokenSpy = jest.spyOn(mockedTokenService, "validateAccessToken");
    const sessionSpy = jest.spyOn(sessionService, "unRegisterSession");

    const uc = new LogoutUseCase(mockedTokenService);
    uc.execute(accessToken);

    expect(tokenSpy).toHaveBeenCalledTimes(1);
    expect(tokenSpy).toHaveBeenCalledWith(accessToken);

    expect(sessionSpy).toHaveBeenCalledTimes(1);
    expect(sessionSpy).toHaveBeenCalledWith(session);
  });
});
