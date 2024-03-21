import { Injectable } from "@nestjs/common";
import { MockedRepository } from "../../../shared/abstract-repository/mocked-repository";
import { PlanMockedEntity } from "./plan.mocked-entity";
import { Plan } from "../../domain/plan.interface";

@Injectable()
export class PlanMockedRepository extends MockedRepository<
  PlanMockedEntity,
  Plan
> {
  domainToEntity(d: Plan): PlanMockedEntity {
    const entity = new PlanMockedEntity();

    entity.name = d.name;
    entity.description = d.description;
    entity.resources = d.resources;
    entity.billing = d.billing;
    entity.isCustom = d.isCustom;

    return entity;
  }

  entityToDomain(e: PlanMockedEntity): Plan {
    return {
      id: e._id,
      name: e.name,
      description: e.description,
      resources: e.resources,
      billing: e.billing,
      isCustom: e.isCustom,
    };
  }

  async getPlanByName(name: string): Promise<Plan> {
    const { data: plans } = await this.findAll({});
    if (plans.length === 0) return null;
    const filtered = plans.filter((s) => s.name === name);
    return filtered.length > 0 ? filtered.shift() : null;
  }
}
