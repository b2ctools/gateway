import { AccountMockedRepository } from "./mocked/account.mocked-repo";
import { AccountMongoRepository } from "./mongo/account.mongo-repo";

export type AccountRepository =
  | AccountMockedRepository
  | AccountMongoRepository;
