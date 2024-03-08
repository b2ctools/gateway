import { TenantRef } from "../../tenant/domain/tenant.interface";
import { IDomain } from "../../shared/abstract-repository/entities/domain";
import { isAdmin } from "src/app/auth/domain/middleware/access-control";

export interface Brand extends IDomain {
  name: string;
  description?: string;
}

export interface BrandDto extends Brand {
  tenantRef?: TenantRef;
}

export const brandToDto = (u: Brand, tenantRef: TenantRef = null): BrandDto => {
  
  // delete u.tenantId;
  return {
    ...u,
    ...(isAdmin() && tenantRef ? { tenant: tenantRef } : {}),
  };
};

export const sortable = ["name", "description"];
