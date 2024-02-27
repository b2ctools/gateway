import { config } from "../../config/config.service";
import { ResourceMockedRepository } from "./mocked/resource.mocked-repo";
import { ResourceMongoRepository } from "./mongo/resource.mongo-repo";

export const getResourceRepo = () => {
  const type = config.get("resourceRepo");
  return {
    provide: "ResourceRepository",
    useClass:
      type === "mock" ? ResourceMockedRepository : ResourceMongoRepository,
  };
};
