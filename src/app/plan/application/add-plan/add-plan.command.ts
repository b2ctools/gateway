import { Billing, Plan, PlanType } from "../../domain/plan.interface";
import { AddPlanRequest } from "./add-plan.request";

export class AddPlanCommand
  implements Omit<Plan, "id" | "tenantId" | "resources">
{
  name: string;
  description?: string;
  billing: Billing[];
  type: PlanType;

  constructor(request: AddPlanRequest) {
    const { name, description, billing, type } = request;
    this.name = name;
    this.description = description;
    this.billing = billing;
    this.type = type;
  }

}
