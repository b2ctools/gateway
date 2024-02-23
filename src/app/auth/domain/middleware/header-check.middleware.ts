import {
  ForbiddenException,
  Inject,
  Injectable,
  NestMiddleware,
} from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { ctxSrv } from "../../../shared/context.service";
import { TokenService } from "../token.service";
import { fetchTokenFromRequest } from "./token-from-request";
import { UserService } from "../../../user/domain/user.service";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import { User, UserRole } from "../../../user/domain/user.interface";
import { TenantService } from "src/app/tenant/domain/tenant.service";

/** Middleware to fetch header info from request */

@Injectable()
export class HeaderCheckMiddleware implements NestMiddleware {
  constructor(
    @Inject(TokenService)
    private readonly tokenService: TokenService,

    @Inject(UserService)
    private readonly userService: UserService,

    @Inject(TenantService)
    private readonly tenantService: TenantService
  ) {}

  private fetchUserAndTenantFromToken(token: string) {
    const { tenantId, userId } = this.tokenService.validateAccessToken(token);
    return {
      tenantId,
      userId,
    };
  }

  private async verifyUser(userId: ID) {
    if (!userId)
      throw new ForbiddenException("UserId not specified.. please try again");

    let user: User = null;
    if (userId) {
      try {
        user = await this.userService.findByIdOrFail(userId);
      } catch (error) {
        console.log("Error looking from User with Id", userId, error);
        throw new ForbiddenException(
          `Error looking from User with Id ${userId}.. please login again`
        );
      }
    }

    if (!user) {
      throw new ForbiddenException(
        `User with Id ${userId} not found.. please try again`
      );
    }
    ctxSrv.setUserId(userId);
    ctxSrv.setUserRole(user.role);
    return user;
  }

  private async verifyTenant(tenantId: ID) {
    if (!tenantId)
      throw new ForbiddenException("TenantId not specified.. please try again");

    try {
      const tenant = await this.tenantService.findByIdOrFail(tenantId)
      if (!tenant) {
        throw new ForbiddenException(
          `Tenant with Id ${tenantId} not found.. please try again`
        );
      }
    } catch (error) {
      throw new ForbiddenException(
        `Error looking for Tenant with Id ${tenantId}.. please login again`
      );
    }
  }

  /** this is a function to set the Tenant to 0 (not defined - multitenant)
   * when the role is ADMIN
   */
  private setTenantIdBasedOnUserRole(
    tenantIdFetchFromToken: ID,
    userRole: UserRole
  ): ID {
    const tenantId =
      userRole === UserRole.ADMIN ? null : tenantIdFetchFromToken;
    ctxSrv.setTenantId(tenantId);
    return tenantId;
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const token = fetchTokenFromRequest(req);
    if (!token) {
      throw new ForbiddenException("Auth Error. Token must be specified.");
    }

    const { tenantId: tenantIdFetchFromToken, userId } =
      this.fetchUserAndTenantFromToken(token);
    const { role } = await this.verifyUser(userId);
    await this.verifyTenant(tenantIdFetchFromToken);
    const tenantId = this.setTenantIdBasedOnUserRole(
      tenantIdFetchFromToken,
      role
    );

    console.log(`
      ===============================================================
      Request Header Information
      ${JSON.stringify({ tenantId, userId })}
      ===============================================================
    `);

    next();
  }
}
