import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { MockedEntity } from "../../../shared/abstract-repository/entities/mocked-entity";
import { Billing, Plan, PlanType } from "../../domain/plan.interface";

export class PlanMockedEntity extends MockedEntity implements Omit<Plan, "id"> {
  name: string;
  description?: string;
  resources: ID[];
  billing: Billing[];
  type: PlanType;
}
