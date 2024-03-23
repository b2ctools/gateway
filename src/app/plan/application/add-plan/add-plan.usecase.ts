import { Inject, Injectable } from "@nestjs/common";
import { PlanService } from "../../domain/plan.service";
import { AddPlanCommand } from "./add-plan.command";
import { PlanDto, planToDto } from "../../domain/plan.interface";

@Injectable()
export class AddPlanUseCase {
  constructor(
    @Inject(PlanService)
    private readonly pcService: PlanService,
  ) {}

  async addPlan(command: AddPlanCommand): Promise<PlanDto> {
    const plan = await this.pcService.addPlan(command);
    return planToDto(plan);
  }
}
