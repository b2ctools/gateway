import { codeFromId } from "src/app/shared/utils/gen-id";
import { IDomain } from "../../shared/abstract-repository/entities/domain";
import { TenantRef } from "src/app/tenant/domain/tenant.interface";
import { ctxSrv } from "src/app/shared/context.service";
import { UserRole } from "src/app/user/domain/user.interface";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

export interface Store extends IDomain {
  name: string;
  description?: string;
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
  const role = ctxSrv.getUserRole();
  delete u.tenantId;
  return {
    ...u,
    code: codeFromId(u.id),
    ...(role === UserRole.ADMIN && tenantRef ? { tenant: tenantRef } : {}),
  };
};

export const sortable = ["name", "description"];
