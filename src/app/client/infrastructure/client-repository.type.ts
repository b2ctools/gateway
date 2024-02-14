
import { ClientMockedRepository } from "./mocked/client.mocked-repo";
import { ClientMongoRepository } from "./mongo/client.mongo-repo";

export type ClientRepository = ClientMockedRepository | ClientMongoRepository
