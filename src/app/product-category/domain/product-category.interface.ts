import { TenantRef } from "../../tenant/domain/tenant.interface";
import { IDomain } from "../../shared/abstract-repository/entities/domain";
import { ID } from "../../shared/abstract-repository/repository.interface";
import { ctxSrv } from "src/app/shared/context.service";
import { UserRole } from "src/app/user/domain/user.interface";

export type CategoryStatus = "active" | "inactive";

export interface ProductCategory extends IDomain {
  name: string;
  description?: string;
  parent: ID;
  status: CategoryStatus;
  tenant?: TenantRef;
}

export interface ProductCategoryTree extends ProductCategory {
  subcategories?: ProductCategoryTree[];
  tenant?: TenantRef;
}

export type ProductCategoryDTO = ProductCategory | ProductCategoryTree;

export const productCategoryToDto = (
  pc: ProductCategory | ProductCategoryTree,
  tenantRef: TenantRef = null,
): ProductCategoryDTO => {
  const role = ctxSrv.getUserRole();
  return {
    ...pc,
    ...(role === UserRole.ADMIN && tenantRef ? { tenant: tenantRef } : {}),
  };
};

export const sortable = ["name", "status", "description"];
