import { Inject, Injectable } from "@nestjs/common";
import { PlanService } from "../../domain/plan.service";
import { SearchOutput, SearchRequest, sanitazeSearchQueryParams } from "../../../shared/filters-and-request/base.request";
import { Plan, PlanDto, planToDto } from "../../domain/plan.interface";
import { sortable } from "../../domain/plan.interface";
import { ResourceService } from "src/app/resource/domain/resource.service";
import { SearchPlanRequest } from "./search-plan.request";
import { BooleanFilter } from "src/app/shared/filters-and-request/request-filters";

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

  private addIsCustomFilter(request: SearchPlanRequest){
    if (request.isCustom) {
      request.filters = request.filters || [];
      request.filters.push(new BooleanFilter("isCustom", !!request.isCustom));
    }
    return request;
  }

  async execute(request: SearchRequest): Promise<SearchOutput<PlanDto>> {
    request = this.addIsCustomFilter(request);
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
