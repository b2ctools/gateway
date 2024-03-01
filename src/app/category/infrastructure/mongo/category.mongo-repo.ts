import { Injectable } from "@nestjs/common";
import { MongoRepository } from "../../../shared/abstract-repository/mongo-repository";
import { CategoryMongoEntity } from "./category.mongo-entity";
import { Category } from "../../domain/category.interface";
import { SearchSubCategoryRequest } from "../../application/sub-category/sub-category.request";

@Injectable()
export class CategoryMongoRepository extends MongoRepository<
  CategoryMongoEntity,
  Category
> {
  domainToEntity(d: Category): CategoryMongoEntity {
    console.log(d);
    throw new Error("Method not implemented.");
  }
  entityToDomain(e: CategoryMongoEntity): Category {
    console.log(e);
    throw new Error("Method not implemented.");
  }

  async getCategoryByName(name: string): Promise<Category> {
    console.log(name);
    throw new Error("Method not implemented.");
  }

  async getCategoryByParentId(
    request: SearchSubCategoryRequest,
  ): Promise<Category[]> {
    console.log(request);
    throw new Error("Method not implemented.");
  }
}
