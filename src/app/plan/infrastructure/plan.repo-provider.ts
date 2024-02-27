import { config } from "../../config/config.service";
import { PlanMockedRepository } from "./mocked/plan.mocked-repo";
import { PlanMongoRepository } from "./mongo/plan.mongo-repo";

export const getPlanRepo = () => {
  const type = config.get("planRepo");
  return {
    provide: "PlanRepository",
    useClass: type === "mock" ? PlanMockedRepository : PlanMongoRepository,
  };
};
