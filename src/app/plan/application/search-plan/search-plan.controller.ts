import { Controller, Get, Inject, Query } from "@nestjs/common";
import { SearchPlanUseCase } from "./search-plan.usecase";
import { PlanDto, sortable, planToDto } from "../../domain/plan.interface";
import { planPath } from "../../../shared/routes";
import { SearchOutput, SearchRequest } from "../../../shared/base.request";

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
    const { data: plans } = await this.useCase.execute(request);
    const items = plans.map((s) => planToDto(s));
    return {
      count: items.length,
      data: items,
      sortable,
    };
  }
}
