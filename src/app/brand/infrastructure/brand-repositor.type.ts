
import { BrandMockedRepository } from "./mocked/brand.mocked-repo";
import { BrandMongoRepository } from "./mongo/brand.mongo-repo";

export type BrandRepository = BrandMockedRepository | BrandMongoRepository
