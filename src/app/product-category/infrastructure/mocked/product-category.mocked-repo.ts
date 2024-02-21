import { Injectable } from "@nestjs/common";
import { MockedRepository } from "../../../shared/abstract-repository/mocked-repository";
import { ProductCategoryMockedEntity } from "./product-category.mocked-entity";
import { ProductCategory } from "../../domain/product-category.interface";
import { SearchSubProductCategoryRequest } from "../../application/sub-product-categories/sub-product-categories.request";

@Injectable()
export class ProductCategoryMockedRepository extends MockedRepository<
  ProductCategoryMockedEntity,
  ProductCategory
> {
  domainToEntity(d: ProductCategory): ProductCategoryMockedEntity {
    const entity = new ProductCategoryMockedEntity();

    entity.name = d.name;
    entity.description = d.description;
    entity.tenantId = d.tenantId;
    entity.parent = d.parent;
    entity.status = d.status;

    entity.createdAt = d.createdAt;
    entity.updatedAt = d.updatedAt;

    return entity;
  }

  entityToDomain(e: ProductCategoryMockedEntity): ProductCategory {
    return {
      id: e._id,
      name: e.name,
      description: e.description,
      tenantId: e.tenantId,
      parent: e.parent,
      status: e.status,


      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }

  async getProductCategoryByName(name: string): Promise<ProductCategory> {
    const { data: categories } = await this.findAll({});
    if (categories.length === 0) return null;
    const filtered = categories.filter((s) => s.name === name);
    return filtered.length > 0 ? filtered.shift() : null;
  }

  async getProductCategoryByParentId(
    request: SearchSubProductCategoryRequest,
  ): Promise<ProductCategory[]> {
    const { parent } = request;
    const { data: categories } = await this.findAll(request);
    if (categories.length === 0) return [];
    return categories.filter((s) => s.parent === parent) as ProductCategory[];
  }
}
