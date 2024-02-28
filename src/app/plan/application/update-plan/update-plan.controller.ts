import { Body, Controller, Inject, Param, Patch } from "@nestjs/common";
import { planPath } from "../../../shared/routes";
import { planToDto } from "../../domain/plan.interface";
import { UpdatePlanUseCse } from "./update-plan.usecase";
import { UpdatePlanRequest } from "./update-plan.request";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

@Controller(planPath)
export class UpdatePlanController {
  constructor(
    @Inject(UpdatePlanUseCse)
    private readonly useCase: UpdatePlanUseCse,
  ) {}

  @Patch(":id")
  async updatePlan(@Param("id") id: ID, @Body() request: UpdatePlanRequest) {
    const pc = await this.useCase.execute(id, request);
    return planToDto(pc);
  }
}
