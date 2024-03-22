import { Inject, Injectable } from "@nestjs/common";
import { PlanService } from "../../domain/plan.service";
import { SearchOutput, SearchRequest, sanitazeSearchQueryParams } from "../../../shared/filters-and-request/base.request";
import { Plan, PlanDto, planToDto } from "../../domain/plan.interface";
import { sortable } from "../../domain/plan.interface";
import { ResourceService } from "src/app/resource/domain/resource.service";

@Injectable()
export class SearchPlanUseCase {
  constructor(
    @Inject(PlanService)
    private readonly planService: PlanService,

    @Inject(ResourceService)
    private readonly resourceService: ResourceService,
  ) {}

  private async getResourceNames(plan: Plan) {
    const { resources } = plan;
    const { data } = await this.resourceService.findAllResources({});
    return data
      .filter((r) => resources.includes(r.id))
      .map((r) => r.name);
  }

  async execute(request: SearchRequest): Promise<SearchOutput<PlanDto>> {
    const { data: plans } = await this.planService.findAllPlans(
      sanitazeSearchQueryParams<SearchRequest>(request, sortable)
    );
    const items = await Promise.all(
      plans.map(async (s) => {
        const resourceNames = await this.getResourceNames(s);
        return planToDto(s, resourceNames)
      }
    ))

    return {
      count: items.length,
      data: items,
      sortable,
    };
  }
}
