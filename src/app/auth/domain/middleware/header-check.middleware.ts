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
import { UserService } from "src/app/user/domain/user.service";
import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { User, UserRole } from "src/app/user/domain/user.interface";

/** Middleware to fetch header info from request */

@Injectable()
export class HeaderCheckMiddleware implements NestMiddleware {
  constructor(
    @Inject(TokenService)
    private readonly tokenService: TokenService,

    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  private fetchUserAndTenantFromToken(token: string) {
    const { tenantId, userId } = this.tokenService.validateAccessToken(token);
    return {
      tenantId,
      userId,
    };
  }

  private async verifyUser(userId: ID) {

    let user: User = null;
    if (userId) {
      try {
        user = await this.userService.findByIdOrFail(userId);
      } catch (error) {
        throw new ForbiddenException("UserId from token not found.. please login again");
      }
    }

    ctxSrv.setUserId(userId);
    return user;
  }

  /** this is a function to set the Tenant to 0 (not defined - multitenant)
   * when the role is ADMIN
   */
  private setTenantIdBasedOnUserRole(tenantIdFetchFromToken: ID, userRole: UserRole): ID{
    
    const tenantId = userRole === UserRole.ADMIN ? null : tenantIdFetchFromToken;
    ctxSrv.setTenantId(tenantId);
    return tenantId;
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const token = fetchTokenFromRequest(req);
    if (!token){
      throw new ForbiddenException("Auth Error. Token must be specified.");
    }
      
    const { tenantId: tenantIdFetchFromToken, userId } = this.fetchUserAndTenantFromToken(token);
    const { role } = await this.verifyUser(userId);
    const tenantId = this.setTenantIdBasedOnUserRole(tenantIdFetchFromToken, role)

    console.log(`
      ===============================================================
      Request Header Information
      ${JSON.stringify({ tenantId, userId })}
      ===============================================================
    `);

    next();
  }
}
