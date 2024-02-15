import { config } from "../../config/config.service";
import { UserMockedRepository } from "./mocked/user.mocked-repo";
import { UserMongoRepository } from "./mongo/user.mongo-repo";

export const getUserRepo = () => {
  const type = config.get("userRepo");
  const userRepoProvider = {
    provide: "UserRepository",
    useClass: type === "mock" ? UserMockedRepository : UserMongoRepository,
  };
  return userRepoProvider;
};
