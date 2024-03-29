import {
  ForbiddenException,
  InternalServerErrorException,
} from "@nestjs/common";
import { Scope } from "../../../account/domain/account.interface";
import { IDomain } from "../../../shared/abstract-repository/entities/domain";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import { ctxSrv } from "../../../shared/context.service";
import { UserRole } from "../../../user/domain/user.interface";

export const allowedForRole = (roles: UserRole[]) => {
  const currentRole = ctxSrv.getUserRole();
  if (!roles.includes(currentRole)) {
    throw new ForbiddenException(
      `User Role ${currentRole} not allowed to access this resource`
    );
  }
};

export const deniedForRole = (roles: UserRole[]) => {
  const currentRole = ctxSrv.getUserRole();
  if (roles.includes(currentRole)) {
    throw new ForbiddenException(
      `User Role ${currentRole} not allowed to access this resource`
    );
  }
};

const validScope = (scope: Scope) => {
  if (!scope) {
    throw new ForbiddenException(
      `Scope must be provided to access to this resource. Please do account-login.`
    );
  }
};

export const allowedForScope = (scopes: Scope[]) => {
  if(isAdmin()) return;
  const currentScope = ctxSrv.getScope();
  validScope(currentScope);
  if (!scopes.includes(currentScope)) {
    throw new ForbiddenException(
      `Account Scope ${currentScope} not allowed to access this resource`
    );
  }
};

export const deniedForScope = (scopes: Scope[]) => {
  if(isAdmin()) return;
  const currentScope = ctxSrv.getScope();
  validScope(currentScope);
  if (scopes.includes(currentScope)) {
    throw new ForbiddenException(
      `Account Scope ${currentScope} not allowed to access this resource`
    );
  }
};

interface TenantDomaintEntity extends IDomain {
  tenantId: ID;
}

export const isAdmin = (): boolean => {
  const currentRole = ctxSrv.getUserRole();
  return currentRole === UserRole.ADMIN;
};

export const isUser = (): boolean => {
  const currentRole = ctxSrv.getUserRole();
  return currentRole === UserRole.USER;
}

export const isOwner = (): boolean => {
  const currentScope = ctxSrv.getScope();
  return currentScope === Scope.OWNER;
};

export const domainEntityFromTenantVerification = (
  domainEntity: TenantDomaintEntity
) => {
  if (isAdmin()) return;

  if (!domainEntity.tenantId) {
    console.error(
      "Tenant domain entity error. Not tenantId specified.",
      domainEntity
    );
    throw new InternalServerErrorException(
      `TenantId not set in the tenant domain entity. Please report this issue.`
    );
  }
  const currentTenant = ctxSrv.getTenantId();
  if (domainEntity.tenantId !== currentTenant) {
    console.error(
      "Tenant domain entity error does not belongs to tenant.",
      domainEntity
    );
    throw new ForbiddenException(
      `Trying to access an entity that does not belong to the current tenant.`
    );
  }
};
