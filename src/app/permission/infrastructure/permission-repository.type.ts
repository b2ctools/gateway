
import { PermissionMockedRepository } from "./mocked/permission.mocked-repo";
import { PermissionMongoRepository } from "./mongo/permission.mongo-repo";

export type PermissionRepository = PermissionMockedRepository | PermissionMongoRepository
