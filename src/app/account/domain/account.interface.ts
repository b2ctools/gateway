import { ID } from "../../shared/abstract-repository/repository.interface";
import { IDomain } from "../../shared/abstract-repository/entities/domain";
import { ctxSrv } from "../../shared/context.service";
import { UserRole } from "../../user/domain/user.interface";
import { TenantRef } from "../../tenant/domain/tenant.interface";
import { getPermissionNamesListFromIds } from "../../access/domain/permissions";
import { StoreRef } from "../../store/domain/store.interface";
import { codeFromId } from "../../shared/utils/gen-id";

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
  // delete a.tenantId;

  if (role === UserRole.ADMIN) {
    delete a.storeId;
  }

  a.permissions = getPermissionNamesListFromIds(a.permissions);
  return {
    ...a,
    code: codeFromId(a.id),
    ...(role === UserRole.ADMIN && tenantRef ? { tenant: tenantRef } : {}),
    store: storeRef,
  };
};

export const sortable = ["storeId"];
