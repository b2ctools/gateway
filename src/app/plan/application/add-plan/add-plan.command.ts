import { Billing, Plan } from "../../domain/plan.interface";
import { AddPlanRequest } from "./add-plan.request";

export class AddPlanCommand
  implements Omit<Plan, "id" | "tenantId" | "resources">
{
  name: string;
  description?: string;
  billing: Billing[];
  isCustom: boolean;

  constructor(request: AddPlanRequest) {
    const { name, description, billing, isCustom } = request;
    this.name = name;
    this.description = description;
    this.billing = billing;
    this.isCustom = !!isCustom;
  }

}
