import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { User, UserRole } from "../../user/domain/user.interface";
import { config } from "../../config/config.service";
import { JwtService } from "@nestjs/jwt";
import { ID } from "../../shared/abstract-repository/repository.interface";
import {
  Account,
  AccountType,
  Scope,
} from "src/app/account/domain/account.interface";

export type Token = {
  token: string;
  expiresAt: string;
};

export type AccessPayload = {
  // user info
  userId: ID;
  email: string;
  role: UserRole;
  session: string;

  // account info
  storeId: ID;
  type: AccountType;
  scope: Scope;
  tenantId: ID;
  permissions: ID[];
};
type RefreshPayload = {
  userId: ID;
  session: string;
};

type RecoveryPasswordToken = {
  code: string;
};

type Payload = AccessPayload | RefreshPayload | RecoveryPasswordToken;

@Injectable()
export class TokenService {
  /** value used to set a common session in access and refresh token */
  private session: string;

  constructor(
    @Inject(JwtService)
    private readonly jwtService: JwtService,
  ) {}

  getSession() {
    return this.session;
  }

  setSession(s: string) {
    this.session = s;
  }

  private formatExpiresAt(timestamp: number) {
    const date = new Date(Date.now() + timestamp);
    return date.toLocaleString();
  }

  private decodeToken(token: string): Payload {
    try {
      return this.jwtService.verify(token) as Payload;
    } catch (error) {
      throw new BadRequestException(
        "Error decoding token. Seams invalid token",
      );
    }
  }

  /** access token */

  private getUndefienedAccount(): Account {
    return {
      id: undefined,
      userId: undefined,
      storeId: undefined,
      type: undefined,
      permissions: [],
      scope: undefined,
      tenantId: undefined,
      isActive: undefined,
    };
  }

  private buildAccessPayload(
    user: User,
    _account: Account = undefined,
  ): AccessPayload {
    const account = !_account ? this.getUndefienedAccount() : _account;
    const { storeId, type, scope, tenantId, permissions } = account;
    const { id: userId, email, role } = user;
    return {
      // user info
      userId,
      email,
      role,
      session: this.session,

      // account info
      storeId,
      type,
      scope,
      tenantId,
      permissions,
    };
  }

  getAccessToken(user: User, account: Account = undefined): Token {
    const payload = this.buildAccessPayload(user, account);
    const expiresIn = config.get("jwtAccessExpire") || "30m";
    const token = this.jwtService.sign(payload, { expiresIn });
    const expiresAt = this.formatExpiresAt(
      parseInt(config.get("jwtAccessExpireTimestamp") as string),
    );

    return {
      token,
      expiresAt,
    };
  }

  validateAccessToken(token: string): AccessPayload {
    const payload = this.decodeToken(token) as AccessPayload;

    const { userId, email, role, session } = payload;

    if (!userId || !email || !role || !session) {
      const errors = {
        userId: !userId ? "there is no userId on the payload" : "",
        email: !email ? "there is no email on the payload" : "",
        role: !role ? "there is no role on the payload" : "",
        session: !session ? "there is no session on the payload" : "",
      };

      const message =
        "Error validing access token. Problems with the payload structure.";
      console.log({ error: message, ...errors });

      throw new BadRequestException(message);
    }

    return payload;
  }

  /** refresh token */

  private buildRefreshPayload(user: User): RefreshPayload {
    const { id: userId } = user;
    return {
      userId,
      session: this.session,
    };
  }

  getRefreshToken(user: User): Token {
    const payload = this.buildRefreshPayload(user);
    const expiresIn = config.get("jwtRefreshExpire") || "1d";
    const token = this.jwtService.sign(payload, { expiresIn });
    const expiresAt = this.formatExpiresAt(
      parseInt(config.get("jwtRefreshExpireTimestamp") as string),
    );

    return {
      token,
      expiresAt,
    };
  }

  validateRefreshToken(token: string): RefreshPayload {
    const payload = this.decodeToken(token) as RefreshPayload;

    const { userId, session } = payload;

    if (!userId || !session)
      throw new BadRequestException(
        "Error validing refresh token. Problems with the payload structure.",
      );

    return payload;
  }

  /** recovery password token */

  getRecoveryPasswordToken(code: string): Token {
    if (!code)
      throw new BadRequestException(
        "Error getting recovery password token. Code was not provided.",
      );
    const expiresIn = config.get("jwtRecoveryExpire") || "30m"; // TODO: jwtRecoveryPasswordExpire
    const token = this.jwtService.sign({ code }, { expiresIn });
    const expiresAt = this.formatExpiresAt(
      parseInt(config.get("jwtRecoveryExpireTimestamp") as string),
    );

    return {
      token,
      expiresAt,
    };
  }

  validateRecoveryPasswordToken(token: string): RecoveryPasswordToken {
    const payload = this.decodeToken(token) as RecoveryPasswordToken;

    const { code } = payload;

    if (!code)
      throw new BadRequestException(
        "Error recovery password token. Problems with the payload structure.",
      );

    return payload;
  }
}
