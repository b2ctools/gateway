
import { TenantMockedRepository } from "./mocked/tenant.mocked-repo";
import { TenantMongoRepository } from "./mongo/tenant.mongo-repo";

export type TenantRepository = TenantMockedRepository | TenantMongoRepository
