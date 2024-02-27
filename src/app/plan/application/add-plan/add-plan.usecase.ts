
import { Inject, Injectable } from '@nestjs/common';
import { PlanService } from '../../domain/plan.service';
import { AddPlanCommand } from './add-plan.command';

@Injectable()
export class AddPlanUseCase {
  constructor(
    @Inject(PlanService)
    private readonly pcService: PlanService
  ) {}

  async addPlan(command: AddPlanCommand){
    return await this.pcService.addPlan(command);
  }

}
