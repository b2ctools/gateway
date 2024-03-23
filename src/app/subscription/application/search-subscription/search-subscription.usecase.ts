import { Inject, Injectable } from "@nestjs/common";
import { SubscriptionService } from "../../domain/subscription.service";
import { SearchOutput, SearchRequest } from "../../../shared/filters-and-request/base.request";
import { TenantService } from "src/app/tenant/domain/tenant.service";
import { SubscriptionDto, subscriptionToDto } from "../../domain/subscription.interface";
import { sortable } from "../../domain/subscription.interface"
import { PlanService } from "src/app/plan/domain/plan.service";

@Injectable()
export class SearchSubscriptionUseCase {
  constructor(
    @Inject(SubscriptionService)
    private readonly subscriptionService: SubscriptionService,

    @Inject(TenantService)
    private readonly tenantService: TenantService,

    @Inject(PlanService)
    private readonly planService: PlanService,    
  ) {}

  async execute(request: SearchRequest): Promise<SearchOutput<SubscriptionDto>> {
    const { data: subscriptions } = await this.subscriptionService.findAllSubscriptions(request);

    const items = subscriptions.map((sub) => {
        const tenantRef = this.tenantService.getTenantRef(sub.tenantId);
        const planRef = this.planService.getPlanRef(sub.planId);
        return subscriptionToDto(sub, tenantRef, planRef);
    });

    return {
      count: items.length,
      data: items,
      sortable,
    };
  }
}
