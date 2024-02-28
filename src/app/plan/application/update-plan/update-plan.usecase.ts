import { Inject, Injectable } from "@nestjs/common";
import { PlanService } from "../../domain/plan.service";
import { UpdatePlanRequest } from "./update-plan.request";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

@Injectable()
export class UpdatePlanUseCse {
  constructor(
    @Inject(PlanService)
    private readonly planService: PlanService,
  ) {}

  async execute(id: ID, request: UpdatePlanRequest) {
    return await this.planService.updatePlan(id, request);
  }
}
