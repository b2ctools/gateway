import { Body, Controller, Inject, Post } from "@nestjs/common";
import { tenantPath } from "src/app/shared/routes";
import { SetPlanRequest } from "./set-plan.request";
import { SetPlanUseCase } from "./set-plan.usecase";

@Controller(tenantPath)
export class SetPlanController {
  constructor(
    @Inject(SetPlanUseCase)
    private readonly useCase: SetPlanUseCase,
  ) {}

  @Post("/set-plan")
  async setPlan(@Body() request: SetPlanRequest) {
    return await this.useCase.execute(request);
    return { message: "Plan set successfully" };
  }
}
