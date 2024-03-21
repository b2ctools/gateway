import { Controller, Get, Inject, Query } from "@nestjs/common";
import { SearchPlanUseCase } from "./search-plan.usecase";
import { PlanDto } from "../../domain/plan.interface";
import { planPath } from "../../../shared/routes";
import { SearchOutput, SearchRequest } from "../../../shared/filters-and-request/base.request";

@Controller(planPath)
export class SearchPlanController {
  constructor(
    @Inject(SearchPlanUseCase)
    private readonly useCase: SearchPlanUseCase,
  ) {}

  @Get()
  async findAllPlans(
    @Query() request: SearchRequest,
  ): Promise<SearchOutput<PlanDto>> {
    return await this.useCase.execute(request);
  }
}
