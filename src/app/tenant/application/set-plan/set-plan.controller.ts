import { Body, Controller, Inject, Param, Post } from "@nestjs/common";
import { tenantPath } from "src/app/shared/routes";
import { SetPlanRequest } from "./set-plan.request";
import { SetPlanUseCase } from "./set-plan.usecase";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

@Controller(tenantPath)
export class SetPlanController {
  constructor(
    @Inject(SetPlanUseCase)
    private readonly useCase: SetPlanUseCase,
  ) {}

  @Post("/:id/set-plan")
  async setPlan(@Param("id") id: ID, @Body() request: SetPlanRequest) {
    await this.useCase.execute(id, request);
    return { message: "Plan set successfully" };
  }
}
