import { TenantRef } from "../../tenant/domain/tenant.interface";
import { IDomain } from "../../shared/abstract-repository/entities/domain";
import { ID } from "../../shared/abstract-repository/repository.interface";
import { ctxSrv } from "src/app/shared/context.service";
import { UserRole } from "src/app/user/domain/user.interface";

export type CategoryStatus = "active" | "inactive";

export interface Category extends IDomain {
  name: string;
  description?: string;
  parent: ID;
  status: CategoryStatus;
  tenant?: TenantRef;
}

export interface CategoryTree extends Category {
  subcategories?: CategoryTree[];
  tenant?: TenantRef;
}

export type CategoryDTO = Category | CategoryTree;

export const categoryToDto = (
  pc: Category | CategoryTree,
  tenantRef: TenantRef = null,
): CategoryDTO => {
  const role = ctxSrv.getUserRole();
  return {
    ...pc,
    ...(role === UserRole.ADMIN && tenantRef ? { tenant: tenantRef } : {}),
  };
};

export const sortable = ["name", "status", "description"];
