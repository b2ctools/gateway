import { IDomain } from "../../shared/abstract-repository/entities/domain";
import { ID } from "../../shared/abstract-repository/repository.interface";

export type CategoryStatus = "active" | "inactive";

export interface ProductCategory extends IDomain {
  name: string;
  description?: string;
  parent: ID;
  status: CategoryStatus;
}

export interface ProductCategoryTree extends ProductCategory {
  subcategories?: ProductCategoryTree[];
}

export type ProductCategoryDTO = ProductCategory | ProductCategoryTree;

export const productCategoryToDto = (
  pc: ProductCategory | ProductCategoryTree,
): ProductCategoryDTO => {
  return { ...pc };
};

export const sortable = ["name", "status", "description"];
