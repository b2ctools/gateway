import { Body, Controller, Inject, Patch } from "@nestjs/common";
import { planPath } from "../../../shared/routes";
import { planToDto } from "../../domain/plan.interface";
import { UpdatePlanUseCse } from "./update-plan.usecase";
import { UpdatePlanRequest } from "./update-plan.request";

@Controller(planPath)
export class UpdatePlanController {
  constructor(
    @Inject(UpdatePlanUseCse)
    private readonly useCase: UpdatePlanUseCse,
  ) {}

  @Patch()
  async updatePlan(@Body() request: UpdatePlanRequest) {
    const pc = await this.useCase.execute(request);
    return planToDto(pc);
  }
}
