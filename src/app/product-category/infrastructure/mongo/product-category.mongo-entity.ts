import { MongoEntity } from "../../../shared/abstract-repository/entities/mongo-entity";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import { ProductCategory } from "../../domain/product-category.interface";

export class ProductCategoryMongoEntity
  extends MongoEntity
  implements Omit<ProductCategory, "id">
{
  name: string;
  description?: string;
  parent: ID;
}
