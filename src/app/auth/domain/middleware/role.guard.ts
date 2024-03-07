import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from "express";
import { fetchTokenFromRequest } from "./token-from-request";
import { TokenService } from "../token.service";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./roles.decorator";
import { UserRole } from "../../../user/domain/user.interface";

@Injectable()
export class RoleChecking implements CanActivate {
  constructor(
    @Inject(TokenService)
    private readonly tokenService: TokenService,

    private reflector: Reflector,
  ) {}

  private checkRoleAccess(ctx: ExecutionContext, role: UserRole) {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [ctx.getHandler(), ctx.getClass()],
    );
    if (!requiredRoles) return;
    if (!role) throw new ForbiddenException("Auth Error. Role not specified.");
    if (!requiredRoles.includes(role))
      throw new ForbiddenException(
        "Auth Error. Role Not authorized to access to this resource.",
      );
  }

  private fetchRoleFromToken(token: string) {
    const { role } = this.tokenService.validateAccessToken(token);
    return role;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = fetchTokenFromRequest(request);
    if (!token)
      throw new ForbiddenException("Auth Error. Token must be specified.");
    const role = this.fetchRoleFromToken(token);
    this.checkRoleAccess(context, role);
    return true;
  }
}
