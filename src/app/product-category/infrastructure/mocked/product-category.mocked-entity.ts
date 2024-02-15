import { MockedEntity } from "../../../shared/abstract-repository/entities/mocked-entity";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import { ProductCategory } from "../../domain/product-category.interface";

export class ProductCategoryMockedEntity
  extends MockedEntity
  implements Omit<ProductCategory, "id">
{
  name: string;
  description?: string;
  parent: ID;
}
