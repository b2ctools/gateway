
import { Inject, Injectable } from '@nestjs/common';
import { PlanService } from '../../domain/plan.service';
import { UpdatePlanRequest } from './update-plan.request';

@Injectable()
export class UpdatePlanUseCse {
  constructor(
    @Inject(PlanService)
    private readonly planService: PlanService
  ) {}

  async execute(request: UpdatePlanRequest) {
    return await this.planService.updatePlan(request);
  }
}
