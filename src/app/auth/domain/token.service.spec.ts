import * as dotenv from "dotenv";
dotenv.config();
import { genId } from "../../shared/utils/gen-id";
import { UserRole, UserStatus } from "../../user/domain/user.interface";
import { encodePassword } from "./encoder.service";
import { TokenService } from "./token.service";
import { JwtService } from "@nestjs/jwt";

const jwt = new JwtService({
  secret: "secret",
});

const _userId = "45e9c429f70ef927e3e219214dc6c203";
const _tenantId = 1;
const _email = "elmer@email.com";
const _role = UserRole.USER;
const _session = genId();
const USER = {
  id: _userId,
  name: "Elmer Entenza",
  email: _email,
  password: encodePassword("12345"),
  tenantId: _tenantId,
  status: UserStatus.ENABLED,
  role: _role,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

describe("TOKEN SERVICE TEST SUITE", () => {
  describe("ACCESS TOKEN", () => {
    test("it should get validated access token", async () => {
      const srv = new TokenService(jwt);
      srv.setSession(_session);

      const token = srv.getAccessToken(USER);
      const { token: accessToken, expiresAt } = token;

      const payload = srv.validateAccessToken(accessToken);

      const { userId, email, role, session } = payload;

      expect(expiresAt).toBeTruthy();
      expect(userId).toBe(_userId);
      expect(email).toBe(_email);
      expect(role).toBe(_role);
      expect(session).toBe(_session);
    });

    test("it should throw error decoding an unvalid token", async () => {
      const srv = new TokenService(jwt);

      try {
        srv.validateAccessToken("---wrong token---");
      } catch (error) {
        expect(error.message).toBe("Error decoding token. Seams invalid token");
      }
    });

    test("it should throw error validating token with wrong payload WITH NO USERID", async () => {
      const srv = new TokenService(jwt);
      srv.setSession(_session);
      const userWithOutId = {
        ...USER,
      };
      delete userWithOutId.id;

      const token = srv.getAccessToken(userWithOutId);
      const { token: accessToken } = token;

      try {
        srv.validateAccessToken(accessToken);
      } catch (error) {
        expect(error.message).toBe(
          "Error validing access token. Problems with the payload structure.",
        );
      }
    });

    test("it should throw error validating token with wrong payload WITH NO SESSION", async () => {
      const srv = new TokenService(jwt);

      const token = srv.getAccessToken(USER);
      const { token: accessToken } = token;

      try {
        srv.validateAccessToken(accessToken);
      } catch (error) {
        expect(error.message).toBe(
          "Error validing access token. Problems with the payload structure.",
        );
      }
    });
  });

  describe("REFRESH TOKEN", () => {
    test("it should get validated refresh token", () => {
      const srv = new TokenService(jwt);
      srv.setSession(_session);

      const token = srv.getRefreshToken(USER);
      const { token: refreshToken, expiresAt } = token;

      const payload = srv.validateRefreshToken(refreshToken);

      const { userId, session } = payload;

      expect(expiresAt).toBeTruthy();
      expect(userId).toBe(_userId);
      expect(session).toBe(_session);
    });

    test("it should throw error decoding an unvalid token", async () => {
      const srv = new TokenService(jwt);

      try {
        srv.validateRefreshToken("---wrong token---");
      } catch (error) {
        expect(error.message).toBe("Error decoding token. Seams invalid token");
      }
    });

    test("it should throw error validating token with wrong payload WITH NO USERID", async () => {
      const srv = new TokenService(jwt);
      srv.setSession(_session);
      const userWithOutId = {
        ...USER,
      };
      delete userWithOutId.id;

      const token = srv.getRefreshToken(userWithOutId);
      const { token: accessToken } = token;

      try {
        srv.validateRefreshToken(accessToken);
      } catch (error) {
        expect(error.message).toBe(
          "Error validing refresh token. Problems with the payload structure.",
        );
      }
    });

    test("it should throw error validating token with wrong payload WITH NO SESSION", async () => {
      const srv = new TokenService(jwt);

      const token = srv.getRefreshToken(USER);
      const { token: accessToken } = token;

      try {
        srv.validateRefreshToken(accessToken);
      } catch (error) {
        expect(error.message).toBe(
          "Error validing refresh token. Problems with the payload structure.",
        );
      }
    });
  });

  describe("RECOVERY PASSWORD TOKEN", () => {
    test("it should get validated recovery password token", () => {
      const srv = new TokenService(jwt);

      const _code = "12345";
      const token = srv.getRecoveryPasswordToken(_code);
      const { token: refreshToken, expiresAt } = token;

      const payload = srv.validateRecoveryPasswordToken(refreshToken);

      const { code } = payload;

      expect(expiresAt).toBeTruthy();
      expect(code).toBe(_code);
    });

    test("it should throw error validating token with wrong payload WITH NO CODE", async () => {
      const srv = new TokenService(jwt);
      try {
        srv.getRecoveryPasswordToken(null);
      } catch (error) {
        expect(error.message).toBe(
          "Error getting recovery password token. Code was not provided.",
        );
      }
    });
  });
});
