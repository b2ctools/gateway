import { ResourceMockedRepository } from "./mocked/resource.mocked-repo";
import { ResourceMongoRepository } from "./mongo/resource.mongo-repo";

export type ResourceRepository =
  | ResourceMockedRepository
  | ResourceMongoRepository;
