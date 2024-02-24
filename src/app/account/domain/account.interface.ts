import { ID } from "../../shared/abstract-repository/repository.interface";
import { IDomain } from "../../shared/abstract-repository/entities/domain";
import { ctxSrv } from "src/app/shared/context.service";
import { UserRole } from "src/app/user/domain/user.interface";
import { TenantRef } from "src/app/tenant/domain/tenant.interface";
import { getPermissionNamesListFromIds } from "src/app/access/domain/permissions";
import { StoreRef } from "src/app/store/domain/store.interface";
import { codeFromId } from "src/app/shared/utils/gen-id";

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
  store?: StoreRef;
}

export const accountToDto = (
  a: Account,
  tenantRef: TenantRef = null,
  storeRef: StoreRef = null,
): AccountDto => {
  const role = ctxSrv.getUserRole();
  delete a.tenantId;

  if (role === UserRole.ADMIN) {
    delete a.storeId;
  }
  
  a.permissions = getPermissionNamesListFromIds(a.permissions);
  return {
    ...a,
    code: codeFromId(a.id),
    ...(role === UserRole.ADMIN && tenantRef ? { tenant: tenantRef } : {}),
    ...(role === UserRole.ADMIN ? { store: storeRef } : {}),
  };
};

export const sortable = ["storeId"];
