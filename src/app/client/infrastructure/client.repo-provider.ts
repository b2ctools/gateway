import { config } from "../../config/config.service";
import { ClientMockedRepository } from "./mocked/client.mocked-repo";
import { ClientMongoRepository } from "./mongo/client.mongo-repo";

export const getClientRepo = () => {
  const type = config.get("clientRepo");
  return {
    provide: "ClientRepository",
    useClass: type === "mock" ? ClientMockedRepository : ClientMongoRepository,
  };
};
