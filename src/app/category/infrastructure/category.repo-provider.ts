import { config } from "../../config/config.service";
import { CategoryMockedRepository } from "./mocked/category.mocked-repo";
import { CategoryMongoRepository } from "./mongo/category.mongo-repo";

export const getCategoryRepo = () => {
  const type = config.get("categoryRepo");
  const userRepoProvider = {
    provide: "CategoryRepository",
    useClass:
      type === "mock"
        ? CategoryMockedRepository
        : CategoryMongoRepository,
  };
  return userRepoProvider;
};
