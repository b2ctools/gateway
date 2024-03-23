
import { Inject, Injectable } from '@nestjs/common';
import { SubscriptionService } from '../../domain/subscription.service';
import { AddSubscriptionCommand } from './add-subscription.command';
import { TenantService } from 'src/app/tenant/domain/tenant.service';
import { ID } from 'src/app/shared/abstract-repository/repository.interface';
import { PlanService } from 'src/app/plan/domain/plan.service';
import { SubscriptionDto, subscriptionToDto } from '../../domain/subscription.interface';
import { EqualFilter } from 'src/app/shared/filters-and-request/request-filters';

@Injectable()
export class AddSubscriptionUseCase {
  constructor(
    @Inject(SubscriptionService)
    private readonly subscriptionService: SubscriptionService,

    @Inject(TenantService)
    private readonly tenantService: TenantService,

    @Inject(PlanService)
    private readonly planService: PlanService,
  ) {}

  private async validateTenantId(tenantId: ID){
    await this.tenantService.findByIdOrFail(tenantId);
  }

  private async validatePlanAndBilling(command: AddSubscriptionCommand){
    const { planId, billing } = command;
    const plan = await this.planService.findByIdOrFail(planId);
    const planBilling = plan.billing.filter(b => b.cycle === billing.cycle);
    if(!planBilling.length){
      throw new Error('Invalid billing cycle');
    }

    const pb = planBilling[0];
    if(pb.price !== billing.price){
      throw new Error('Invalid price');
    }
  }

  private async validateUniqueSubscription(tenantId: ID){
    const { data } = await this.subscriptionService.findAllSubscriptions({
      filters: [new EqualFilter('tenantId', tenantId)]
    })
    if(data.length){
      const sub = data[0];
      throw new Error(`Tenant already has a subscription with id ${sub.id}`);
    }
  }

  async execute(command: AddSubscriptionCommand): Promise<SubscriptionDto>{
    const { tenantId } = command;
    await this.validateTenantId(tenantId);
    await this.validatePlanAndBilling(command);
    await this.validateUniqueSubscription(tenantId);

    const sub =  await this.subscriptionService.addSubscription(command);
    const tenantRef = this.tenantService.getTenantRef(sub.tenantId);
    const planRef = this.planService.getPlanRef(sub.planId);
    return subscriptionToDto(sub, tenantRef, planRef);
  }

}
