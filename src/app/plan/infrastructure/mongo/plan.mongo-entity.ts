
import { MongoEntity } from "../../../shared/abstract-repository/entities/mongo-entity";
import { Plan } from "../../domain/plan.interface";

export class PlanMongoEntity extends MongoEntity implements Omit<Plan, 'id'>{
    name: string;
    description?: string;
}
