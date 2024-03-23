import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { PlanRepository } from "../infrastructure/plan-repository.type";
import { AddPlanCommand } from "../application/add-plan/add-plan.command";
import { Plan, PlanRef } from "./plan.interface";
import { FindAllOutput, ID } from "../../shared/abstract-repository/repository.interface";
import { SearchRequest } from "../../shared/filters-and-request/base.request";
import { UpdatePlanRequest } from "../application/update-plan/update-plan.request";
import { SetResourcesRequest } from "../application/set-resources/set-resources.request";
import { codeFromId } from "src/app/shared/utils/gen-id";

@Injectable()
export class PlanService {
  private backupPlans: Plan[] = [];
  constructor(
    @Inject("PlanRepository")
    private readonly planRepo: PlanRepository,
  ) {}

  private async updateBackupPlans() {
    const response = await this.planRepo.findAll({});
    this.backupPlans = response.data;
  }

  getPlanRef(planId: ID): PlanRef {
    if (!planId) {
      return null;
    }
    const plan = this.backupPlans.find((t) => t.id === planId);

    if (!plan) {
      return null;
    }

    return {
      id: plan.id,
      name: plan.name,
      code: codeFromId(plan.id),
    };
  }

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

    const response = await this.planRepo.create(plan);
    this.updateBackupPlans();
    return response
  }

  async removePlan(id: ID) {
    await this.planRepo.delete(id);
    this.updateBackupPlans();
  }

  async findAllPlans(request: SearchRequest): Promise<FindAllOutput<Plan>> {
    return await this.planRepo.findAll(request);
  }

  async updatePlan(id: ID, request: UpdatePlanRequest): Promise<Plan> {
    const { name, description, billing, type, defaultBillingCycle } = request;
    const existingPlan = await this.findByIdOrFail(id);

    if (name){
      await this.canUpdateName(name, existingPlan.id);
    }

    const planToUpdate = {
      ...existingPlan,
      ...(name ? { name } : {}),
      ...(description ? { description } : {}),
      ...(billing ? { billing } : {}),
      ...(type ? { type } : {}),
      ...(defaultBillingCycle ? { defaultBillingCycle } : {}),
    };

    console.log(`Updating Plan - ${JSON.stringify(request)}`);
    const response = await this.planRepo.persist(planToUpdate);
    this.updateBackupPlans();
    return response;
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

  private async canUpdateName(name: string, existingId: ID) {
    const plan = await this.planRepo.getPlanByName(name);
    if (plan && plan.id !== existingId) {
      throw new BadRequestException(`Plan name ${name} is already taken`);
    }
  }
}
