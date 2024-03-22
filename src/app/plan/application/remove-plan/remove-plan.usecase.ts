import { Inject, Injectable } from "@nestjs/common";
import { PlanService } from "../../domain/plan.service";
import { ID } from "../../../shared/abstract-repository/repository.interface";

@Injectable()
export class RemovePlanUseCase {
  constructor(
    @Inject(PlanService)
    private readonly planService: PlanService,
  ) {}

  async execute(planId: ID) {
    await this.planService.findByIdOrFail(planId);
    await this.planService.removePlan(planId);
  }
}
