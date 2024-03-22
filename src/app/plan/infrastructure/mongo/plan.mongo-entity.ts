import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { MongoEntity } from "../../../shared/abstract-repository/entities/mongo-entity";
import { Billing, BillingCycle, Plan, PlanType } from "../../domain/plan.interface";

export class PlanMongoEntity extends MongoEntity implements Omit<Plan, "id"> {
  name: string;
  description?: string;
  resources: ID[];
  billing: Billing[];
  type: PlanType;
  defaultBillingCycle: BillingCycle;
}
