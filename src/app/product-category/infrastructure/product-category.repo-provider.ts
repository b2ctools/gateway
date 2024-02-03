
import { config } from "../../config/config.service";
import { ProductCategoryMockedRepository } from "./mocked/product-category.mocked-repo";
import { ProductCategoryMongoRepository } from "./mongo/product-category.mongo-repo";

export const getProductCategoryRepo = () => {
    const type = config.get('productCategoryRepo');
    const userRepoProvider = {
        provide: 'ProductCategoryRepository',
        useClass: type === 'mock' ? ProductCategoryMockedRepository : ProductCategoryMongoRepository
    }
    return userRepoProvider
}