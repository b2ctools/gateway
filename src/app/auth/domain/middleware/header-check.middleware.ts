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

    if (userId) {
      try {
        await this.userService.findByIdOrFail(userId);
      } catch (error) {
        throw new ForbiddenException("UserId from token not found.. please login again");
      }
    }
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const token = fetchTokenFromRequest(req);
    if (!token){
      throw new ForbiddenException("Auth Error. Token must be specified.");
    }
      
    const { tenantId, userId } = this.fetchUserAndTenantFromToken(token);
    await this.verifyUser(userId);

    console.log(`
      ===============================================================
      Request Header Information
      ${JSON.stringify({ tenantId, userId })}
      ===============================================================
    `);

    if (!tenantId) {
      return res.status(400).send("TenantId header is missing");
    }

    if (!userId) {
      return res.status(400).send("UserId header is missing");
    }

    ctxSrv.setTenantId(tenantId);
    ctxSrv.setUserId(userId);

    next();
  }
}
