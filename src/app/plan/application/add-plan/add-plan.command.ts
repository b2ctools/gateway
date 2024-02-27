import { Plan } from "../../domain/plan.interface";
import { AddPlanRequest } from "./add-plan.request";

export class AddPlanCommand
  implements Omit<Plan, "id" | "tenantId" | "resources">
{
  name: string;
  description?: string;

  constructor(request: AddPlanRequest) {
    const { name, description } = request;
    this.name = name;
    this.description = description;
  }
}
