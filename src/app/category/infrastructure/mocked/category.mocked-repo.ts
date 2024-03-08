import { Injectable } from "@nestjs/common";
import { MockedRepository } from "../../../shared/abstract-repository/mocked-repository";
import { CategoryMockedEntity } from "./category.mocked-entity";
import { Category } from "../../domain/category.interface";
import { SearchSubCategoryRequest } from "../../application/sub-category/sub-category.request";

@Injectable()
export class CategoryMockedRepository extends MockedRepository<
  CategoryMockedEntity,
  Category
> {
  domainToEntity(d: Category): CategoryMockedEntity {
    const entity = new CategoryMockedEntity();

    entity.name = d.name;
    entity.description = d.description;
    entity.parent = d.parent;
    entity.status = d.status;

    entity.createdAt = d.createdAt;
    entity.updatedAt = d.updatedAt;
    entity.tenantId = d.tenantId;

    return entity;
  }

  entityToDomain(e: CategoryMockedEntity): Category {
    return {
      id: e._id,
      name: e.name,
      description: e.description,
      parent: e.parent,
      status: e.status,
      tenantId: e.tenantId,

      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }

  async getCategoryByName(name: string): Promise<Category> {
    const { data: categories } = await this.findAll({});
    if (categories.length === 0) return null;
    const filtered = categories.filter((s) => s.name === name);
    return filtered.length > 0 ? filtered.shift() : null;
  }

  async getCategoryByParentId(
    request: SearchSubCategoryRequest,
  ): Promise<Category[]> {
    const { parent } = request;
    const { data: categories } = await this.findAll(request);
    if (categories.length === 0) return [];
    return categories.filter((s) => s.parent === parent) as Category[];
  }
}
