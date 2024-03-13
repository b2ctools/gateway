import { TenantRef } from "../../tenant/domain/tenant.interface";
import { IDomain } from "../../shared/abstract-repository/entities/domain";
import { ID } from "../../shared/abstract-repository/repository.interface";
import { isAdmin } from "src/app/auth/domain/middleware/access-control";

export type CategoryStatus = "active" | "inactive";

export interface Category extends IDomain {
  name: string;
  description?: string;
  parent: ID;
  status: CategoryStatus;
  tenantId: ID;
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
  return {
    ...pc,
    ...(isAdmin() && tenantRef ? { tenant: tenantRef } : {}),
  };
};

export const sortable = ["name", "status", "description", "tenantId"];
