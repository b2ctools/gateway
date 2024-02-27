
import { MockedEntity } from "../../../shared/abstract-repository/entities/mocked-entity";
import { Plan } from "../../domain/plan.interface";

export class PlanMockedEntity extends MockedEntity implements Omit<Plan, 'id'> {
    name: string;
    description?: string;
}
