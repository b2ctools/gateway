import { TenantRef } from "../../tenant/domain/tenant.interface";
import { IDomain } from "../../shared/abstract-repository/entities/domain";
import { ctxSrv } from "../../shared/context.service";
import { UserRole } from "../../user/domain/user.interface";

export interface Brand extends IDomain {
  name: string;
  description?: string;
}

export interface BrandDto extends Brand {
  tenantRef?: TenantRef;
}

export const brandToDto = (u: Brand, tenantRef: TenantRef = null): BrandDto => {
  const role = ctxSrv.getUserRole();
  delete u.tenantId;
  return {
    ...u,
    ...(role === UserRole.ADMIN && tenantRef ? { tenant: tenantRef } : {}),
  };
};

export const sortable = ["name", "description"];
