import { Inject, Injectable } from "@nestjs/common";
import { PlanService } from "../../domain/plan.service";
import { SearchRequest } from "../../../shared/base.request";

@Injectable()
export class SearchPlanUseCase {
  constructor(
    @Inject(PlanService)
    private readonly planService: PlanService,
  ) {}

  async execute(request: SearchRequest) {
    return await this.planService.findAllPlans(request);
  }
}
