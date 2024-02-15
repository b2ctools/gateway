import { Injectable } from "@nestjs/common";
import { MongoRepository } from "../../../shared/abstract-repository/mongo-repository";
import { ProductCategoryMongoEntity } from "./product-category.mongo-entity";
import { ProductCategory } from "../../domain/product-category.interface";
import { SearchSubProductCategoryRequest } from "../../application/sub-product-categories/sub-product-categories.request";

@Injectable()
export class ProductCategoryMongoRepository extends MongoRepository<
  ProductCategoryMongoEntity,
  ProductCategory
> {
  domainToEntity(d: ProductCategory): ProductCategoryMongoEntity {
    console.log(d);
    throw new Error("Method not implemented.");
  }
  entityToDomain(e: ProductCategoryMongoEntity): ProductCategory {
    console.log(e);
    throw new Error("Method not implemented.");
  }

  async getProductCategoryByName(name: string): Promise<ProductCategory> {
    console.log(name);
    throw new Error("Method not implemented.");
  }

  async getProductCategoryByParentId(
    request: SearchSubProductCategoryRequest,
  ): Promise<ProductCategory[]> {
    console.log(request);
    throw new Error("Method not implemented.");
  }
}
