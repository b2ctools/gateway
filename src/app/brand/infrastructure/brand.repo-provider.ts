
import { config } from "../../config/config.service";
import { BrandMockedRepository } from "./mocked/brand.mocked-repo";
import { BrandMongoRepository } from "./mongo/brand.mongo-repo";

export const getBrandRepo = () => {
    const type = config.get('brandRepo');
    return {
        provide: 'BrandRepository',
        useClass: type === 'mock' ? BrandMockedRepository : BrandMongoRepository
    }
}
