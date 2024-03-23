
import { Inject, Injectable } from "@nestjs/common";
import { SubscriptionService } from "../../domain/subscription.service";
import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { SubscriptionDto, subscriptionToDto } from "../../domain/subscription.interface";
import { TenantService } from "src/app/tenant/domain/tenant.service";
import { PlanService } from "src/app/plan/domain/plan.service";

@Injectable()
export class FindOneSubscriptionUseCase {
    constructor(
        @Inject(SubscriptionService)
        private readonly subscriptionService: SubscriptionService,

        @Inject(TenantService)
        private readonly tenantService: TenantService,

        @Inject(PlanService)
        private readonly planService: PlanService,
    ) {}
    
    async execute(id: ID): Promise<SubscriptionDto> {
        const subscription = await this.subscriptionService.findByIdOrFail(id);
        const tenantRef = this.tenantService.getTenantRef(subscription.tenantId);
        const planRef = this.planService.getPlanRef(subscription.planId);
        return subscriptionToDto(subscription, tenantRef, planRef);
    }
}
