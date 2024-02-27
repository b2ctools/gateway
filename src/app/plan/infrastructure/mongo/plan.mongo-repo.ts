import { Injectable } from "@nestjs/common";
import { MongoRepository } from "../../../shared/abstract-repository/mongo-repository";
import { PlanMongoEntity } from "./plan.mongo-entity";
import { Plan } from "../../domain/plan.interface";

@Injectable()
export class PlanMongoRepository extends MongoRepository<
  PlanMongoEntity,
  Plan
> {
  domainToEntity(d: Plan): PlanMongoEntity {
    console.log(d);
    throw new Error("Method not implemented.");
  }
  entityToDomain(e: PlanMongoEntity): Plan {
    console.log(e);
    throw new Error("Method not implemented.");
  }

  async getPlanByName(name: string): Promise<Plan> {
    console.log(name);
    throw new Error("Method not implemented.");
  }
}
