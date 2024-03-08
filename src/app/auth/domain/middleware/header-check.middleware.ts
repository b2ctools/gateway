import {
  ForbiddenException,
  Inject,
  Injectable,
  NestMiddleware,
} from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { ctxSrv } from "../../../shared/context.service";
import { AccessPayload, TokenService } from "../token.service";
import { fetchTokenFromRequest } from "./token-from-request";
import { UserService } from "../../../user/domain/user.service";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import { User } from "../../../user/domain/user.interface";
import { TenantService } from "../../../tenant/domain/tenant.service";

/** Middleware to fetch header info from request */

@Injectable()
export class HeaderCheckMiddleware implements NestMiddleware {
  constructor(
    @Inject(TokenService)
    private readonly tokenService: TokenService,

    @Inject(UserService)
    private readonly userService: UserService,

    @Inject(TenantService)
    private readonly tenantService: TenantService,
  ) {}

  private async verifyUser(userId: ID): Promise<void> {
    if (!userId)
      throw new ForbiddenException("UserId not specified.. please try again");

    let user: User = null;
    if (userId) {
      try {
        user = await this.userService.findByIdOrFail(userId);
      } catch (error) {
        console.log("Error looking from User with Id", userId, error);
        throw new ForbiddenException(
          `Error looking from User with Id ${userId}.. please login again`,
        );
      }
    }

    if (!user) {
      throw new ForbiddenException(
        `User with Id ${userId} not found.. please try again`,
      );
    }
  }

  private setContextValues(payload: AccessPayload) {
    const {
      userId,
      role,
      tenantId,
      storeId,
      type,
      scope,
      permissions,
      session,
    } = payload;
    ctxSrv.setUserId(userId);
    ctxSrv.setUserRole(role);
    ctxSrv.setTenantId(tenantId);
    ctxSrv.setStoreId(storeId);
    ctxSrv.setType(type);
    ctxSrv.setScope(scope);
    ctxSrv.setPermissions(permissions);
    ctxSrv.setSession(session);
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const token = fetchTokenFromRequest(req);
    if (!token) {
      throw new ForbiddenException("Auth Error. Token must be specified.");
    }

    const payload = this.tokenService.validateAccessToken(token);

    const { userId, role, scope } = payload;
    await this.verifyUser(userId);
    this.setContextValues(payload);

    console.log(`
      ===============================================================
      Request Header Information
      ${JSON.stringify({ userId, role, scope })}
      ===============================================================
    `);

    next();
  }
}
