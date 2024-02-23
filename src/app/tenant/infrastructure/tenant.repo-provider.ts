
import { config } from "../../config/config.service";
import { TenantMockedRepository } from "./mocked/tenant.mocked-repo";
import { TenantMongoRepository } from "./mongo/tenant.mongo-repo";

export const getTenantRepo = () => {
    const type = config.get('tenantRepo');
    return {
        provide: 'TenantRepository',
        useClass: type === 'mock' ? TenantMockedRepository : TenantMongoRepository
    }
}
