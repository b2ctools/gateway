import { config } from "../../config/config.service";
import { AccountMockedRepository } from "./mocked/account.mocked-repo";
import { AccountMongoRepository } from "./mongo/account.mongo-repo";

export const getAccountRepo = () => {
  const type = config.get("accountRepo");
  return {
    provide: "AccountRepository",
    useClass:
      type === "mock" ? AccountMockedRepository : AccountMongoRepository,
  };
};
