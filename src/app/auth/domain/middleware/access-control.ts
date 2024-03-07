import { ForbiddenException } from "@nestjs/common";
import { Scope } from "src/app/account/domain/account.interface";
import { ctxSrv } from "src/app/shared/context.service";
import { UserRole } from "src/app/user/domain/user.interface";

export const allowedForRole = (roles : UserRole[]) => {
    const currentRole = ctxSrv.getUserRole();
    if (!roles.includes(currentRole)) {
        throw new ForbiddenException(`User Role ${currentRole} not allowed to access this resource`);
    }
}

export const deniedForRole = (roles : UserRole[]) => {
    const currentRole = ctxSrv.getUserRole();
    if (roles.includes(currentRole)) {
        throw new ForbiddenException(`User Role ${currentRole} not allowed to access this resource`);
    }
}

const validScope = (scope: Scope) => {
    if (!scope) {
        throw new ForbiddenException(`Scope must be provided to access to this resource. Please do account-login.`);
    }
}

export const allowedForScope = (scopes: Scope[]) => {
    const currentRole = ctxSrv.getUserRole();
    if (currentRole === UserRole.ADMIN) return;
    const currentScope = ctxSrv.getScope();
    validScope(currentScope);
    if (!scopes.includes(currentScope)) {
        throw new ForbiddenException(`Account Scope ${currentScope} not allowed to access this resource`);
    }
}

export const deniedForScope = (scopes: Scope[]) => {
    const currentRole = ctxSrv.getUserRole();
    if (currentRole === UserRole.ADMIN) return;
    const currentScope = ctxSrv.getScope();
    validScope(currentScope);
    if (scopes.includes(currentScope)) {
        throw new ForbiddenException(`Account Scope ${currentScope} not allowed to access this resource`);
    }
}