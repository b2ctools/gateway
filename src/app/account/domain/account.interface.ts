import { ID } from "../../shared/abstract-repository/repository.interface";
import { IDomain } from "../../shared/abstract-repository/entities/domain";
import { ctxSrv } from "src/app/shared/context.service";
import { UserRole } from "src/app/user/domain/user.interface";
import { TenantRef } from "src/app/tenant/domain/tenant.interface";

export enum Scope {
  STORE_ADMIN = "STORE_ADMIN",
  DELIVERY_MANAGER = "DELIVERY_MANAGER",
}

export interface Account extends IDomain {
  userId: ID;
  storeId: ID;
  permissions: ID[];
  scope: Scope;
}

export interface AccountDto extends Account {
  code: string;
  tenant?: TenantRef;
}

export const accountToDto = (
  a: Account,
  tenantRef: TenantRef = null,
): AccountDto => {
  const role = ctxSrv.getUserRole();
  delete a.tenantId;
  return {
    ...a,
    code: a.id as string,
    ...(role === UserRole.ADMIN && tenantRef ? { tenant: tenantRef } : {}),
  };
};

export const sortable = ["storeId"];
