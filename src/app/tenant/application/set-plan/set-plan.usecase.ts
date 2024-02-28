import { Inject, Injectable } from "@nestjs/common";
import { TenantService } from "../../domain/tenant.service";
import { SetPlanRequest } from "./set-plan.request";
import { PlanService } from "src/app/plan/domain/plan.service";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

@Injectable()
export class SetPlanUseCase {
  constructor(
    @Inject(TenantService)
    private readonly tenantService: TenantService,

    @Inject(PlanService)
    private readonly planService: PlanService,
  ) {}

  async execute(id: ID, request: SetPlanRequest) {
    const { planId } = request;
    await this.planService.findByIdOrFail(planId);
    await this.tenantService.setPlan(id, planId);
  }
}
