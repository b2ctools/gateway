
import { Inject, Injectable } from '@nestjs/common';
import { SubscriptionService } from '../../domain/subscription.service';
import { UpdateSubscriptionRequest } from './update-subscription.request';
import { ID } from 'src/app/shared/abstract-repository/repository.interface';
import { SubscriptionDto, subscriptionToDto } from '../../domain/subscription.interface';
import { PlanService } from 'src/app/plan/domain/plan.service';

@Injectable()
export class UpdateSubscriptionUseCse {
  constructor(
    @Inject(SubscriptionService)
    private readonly subscriptionService: SubscriptionService,

    @Inject(PlanService)
    private readonly planService: PlanService,    
  ) {}

  async execute(id: ID, request: UpdateSubscriptionRequest): Promise<SubscriptionDto> {
    const sub = await this.subscriptionService.updateSubscription(id, request);
    const planRef = this.planService.getPlanRef(sub.planId);
    return subscriptionToDto(sub, planRef);
  }
}
