import { Body, Controller, Inject, Post } from "@nestjs/common";
import { planPath } from "../../../shared/routes";
import { AddPlanUseCase } from "./add-plan.usecase";
import { AddPlanRequest } from "./add-plan.request";
import { AddPlanCommand } from "./add-plan.command";
import { PlanDto } from "../../domain/plan.interface";

@Controller(planPath)
export class AddPlanController {
  constructor(
    @Inject(AddPlanUseCase)
    private readonly useCase: AddPlanUseCase,
  ) {}

  @Post()
  async addPlan(@Body() request: AddPlanRequest): Promise<PlanDto> {
    return await this.useCase.addPlan(new AddPlanCommand(request));
    
  }
}
