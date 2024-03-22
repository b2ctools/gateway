import { BadRequestException } from "@nestjs/common";
import { Billing, BillingCycle, Plan, PlanType } from "../../domain/plan.interface";
import { AddPlanRequest } from "./add-plan.request";

export class AddPlanCommand
  implements Omit<Plan, "id" | "tenantId" | "resources">
{
  name: string;
  description?: string;
  billing: Billing[] = [];
  type: PlanType;
  defaultBillingCycle?: BillingCycle;

  constructor(request: AddPlanRequest) {
    const { name, description, billing, type, defaultBillingCycle } = request;

    // billing must be an array
    if (!Array.isArray(billing)){
      throw new BadRequestException("Billing must be an array");
    }

    // billing must have unique cycles
    const cycles = billing.map((b) => b.cycle);
    if (new Set(cycles).size !== cycles.length) {
      throw new BadRequestException("Billing cycles must be unique");
    }

    this.name = name;
    this.description = description;
    this.billing = billing || [];
    this.type = type;
    this.defaultBillingCycle = defaultBillingCycle || null;

    if (!this.defaultBillingCycle && this.billing.length > 0) {
      this.defaultBillingCycle = this.billing[0].cycle;
    }

    if (
      defaultBillingCycle 
      && !this.billing.find((b) => b.cycle === defaultBillingCycle)) {
      
        throw new BadRequestException("Default billing cycle can not be set. There is no matching billing cycle. ")
    }
  }

}
