import { ID } from "../../shared/abstract-repository/repository.interface";
import { IDomain } from "../../shared/abstract-repository/entities/domain";
import { TenantRef } from "../../tenant/domain/tenant.interface";
import { StoreRef } from "../../store/domain/store.interface";
import { codeFromId } from "../../shared/utils/gen-id";
import { PermissionRef } from "../../permission/domain/permission.interface";
import { isAdmin } from "src/app/auth/domain/middleware/access-control";

export enum Scope {
  OWNER = "owner",
  MANAGER = "manager",
  EMPLOYEE = "employee",
}

export type AccountType = "tenant" | "store";

export interface Account extends IDomain {
  userId: ID;
  type: AccountType;
  storeId?: ID;
  permissions: ID[];
  scope: Scope;
  tenantId: ID;
  isActive: boolean;
}

export interface AccountDto extends Omit<Account, "permissions" | "type"> {
  code: string;
  tenant?: TenantRef;
  store?: StoreRef;
  permissions: PermissionRef[];
}

export const accountToDto = (
  a: Account,
  tenantRef: TenantRef = null,
  storeRef: StoreRef = null,
  permissionsRef: PermissionRef[] = null,
): AccountDto => {
  delete a.tenantId;
  delete a.storeId;
  delete a.type;

  return {
    ...a,
    code: codeFromId(a.id),
    ...(isAdmin() && tenantRef ? { tenant: tenantRef } : {}),
    store: storeRef,
    permissions: permissionsRef,
  };
};

export const sortable = ["storeId"];
