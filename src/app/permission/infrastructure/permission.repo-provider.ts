
import { config } from "../../config/config.service";
import { PermissionMockedRepository } from "./mocked/permission.mocked-repo";
import { PermissionMongoRepository } from "./mongo/permission.mongo-repo";

export const getPermissionRepo = () => {
    const type = config.get('permissionRepo');
    return {
        provide: 'PermissionRepository',
        useClass: type === 'mock' ? PermissionMockedRepository : PermissionMongoRepository
    }
}
