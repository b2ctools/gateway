import { config } from "../../config/config.service";
import { StoreMockedRepository } from "./mocked/store.mocked-repo";
import { StoreMongoRepository } from "./mongo/store.mongo-repo";

export const getStoreRepo = () => {
    const type = config.get('userRepo');
    const userRepoProvider = {
        provide: 'StoreRepository',
        useClass: type === 'mock' ? StoreMockedRepository : StoreMongoRepository
    }
    return userRepoProvider
}