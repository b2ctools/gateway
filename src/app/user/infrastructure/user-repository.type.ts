import { UserMockedRepository } from "./mocked/user.mocked-repo";
import { UserMongoRepository } from "./mongo/user.mongo-repo";

export type UserRepository = UserMockedRepository | UserMongoRepository;