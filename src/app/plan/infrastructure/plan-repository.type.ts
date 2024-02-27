import { PlanMockedRepository } from "./mocked/plan.mocked-repo";
import { PlanMongoRepository } from "./mongo/plan.mongo-repo";

export type PlanRepository = PlanMockedRepository | PlanMongoRepository;
