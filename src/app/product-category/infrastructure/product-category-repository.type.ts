import { ProductCategoryMockedRepository } from "./mocked/product-category.mocked-repo";
import { ProductCategoryMongoRepository } from "./mongo/product-category.mongo-repo";

export type ProductCategoryRepository =
  | ProductCategoryMockedRepository
  | ProductCategoryMongoRepository;
