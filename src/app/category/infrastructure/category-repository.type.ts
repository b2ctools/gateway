import { CategoryMockedRepository } from "./mocked/category.mocked-repo";
import { CategoryMongoRepository } from "./mongo/category.mongo-repo";

export type CategoryRepository =
  | CategoryMockedRepository
  | CategoryMongoRepository;
