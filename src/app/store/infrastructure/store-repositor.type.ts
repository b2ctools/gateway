import { StoreMockedRepository } from "./mocked/store.mocked-repo";
import { StoreMongoRepository } from "./mongo/store.mongo-repo";

export type StoreRepository = StoreMockedRepository | StoreMongoRepository;