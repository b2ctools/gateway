import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { PlanRepository } from "../infrastructure/plan-repository.type";
import { AddPlanCommand } from "../application/add-plan/add-plan.command";
import { Plan } from "./plan.interface";
import { ID } from "../../shared/abstract-repository/repository.interface";
import { SearchRequest } from "../../shared/base.request";
import { UpdatePlanRequest } from "../application/update-plan/update-plan.request";
import { SetResourcesRequest } from "../application/set-resources/set-resources.request";

@Injectable()
export class PlanService {
  constructor(
    @Inject("PlanRepository")
    private readonly planRepo: PlanRepository,
  ) {}

  private async verifyPlanName(name: string): Promise<void> {
    const existing = await this.planRepo.getPlanByName(name);

    if (existing) {
      throw new BadRequestException(`Plan name  is already taken`);
    }
  }

  async findByIdOrFail(planId: ID) {
    const existingPlan = await this.planRepo.findById(planId);
    if (!existingPlan) {
      throw new BadRequestException(`Plan with id ${planId} not found`);
    }
    return existingPlan;
  }

  async addPlan(command: AddPlanCommand) {
    await this.verifyPlanName(command.name);

    const plan: Plan = {
      id: null,
      resources: [],
      ...command,
    };

    return await this.planRepo.create(plan);
  }

  async removePlan(id: ID) {
    await this.planRepo.delete(id);
  }

  async findAllPlans(request: SearchRequest) {
    return await this.planRepo.findAll(request);
  }

  async updatePlan(request: UpdatePlanRequest): Promise<Plan> {
    const { id, name, description } = request;
    const existingPlan = await this.findByIdOrFail(id);

    existingPlan.name = name ? name : existingPlan.name;
    existingPlan.description = description
      ? description
      : existingPlan.description;

    console.log(
      `Updating Plan - ${JSON.stringify({
        id,
        name,
        description,
      })}`,
    );
    return await this.planRepo.persist(existingPlan);
  }

  async setResources(request: SetResourcesRequest) {
    const { id: planId, resources } = request;
    const existingPlan = await this.findByIdOrFail(planId);
    existingPlan.resources = [...new Set(resources)];
    return await this.planRepo.persist(existingPlan);
  }

  async findPlanByName(name: string) {
    return await this.planRepo.getPlanByName(name);
  }
}
