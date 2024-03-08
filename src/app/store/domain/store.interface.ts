import { codeFromId } from "../../shared/utils/gen-id";
import { IDomain } from "../../shared/abstract-repository/entities/domain";
import { TenantRef } from "../../tenant/domain/tenant.interface";
import { ID } from "../../shared/abstract-repository/repository.interface";
import { isAdmin } from "src/app/auth/domain/middleware/access-control";

export type StoreAddress = string;

export interface Store extends IDomain {
  name: string;
  description?: string;
  address: StoreAddress;
  logo: string;
  managedBy: ID;
  tenantId: ID;
}

export interface StoreDto extends Store {
  code: string;
  tenant?: TenantRef;
}

export interface StoreRef {
  id: ID;
  name: string;
  code: string;
}

export const storeToDto = (u: Store, tenantRef: TenantRef = null): StoreDto => {
  // delete u.tenantId;
  return {
    ...u,
    code: codeFromId(u.id),
    ...(isAdmin() && tenantRef ? { tenant: tenantRef } : {}),
  };
};

export const sortable = ["name", "description"];
