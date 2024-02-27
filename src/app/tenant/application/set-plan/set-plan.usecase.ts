import { Inject, Injectable } from "@nestjs/common";
import { TenantService } from "../../domain/tenant.service";
import { SetPlanRequest } from "./set-plan.request";
import { PlanService } from "src/app/plan/domain/plan.service";

@Injectable()
export class SetPlanUseCase {
  constructor(
    @Inject(TenantService)
    private readonly tenantService: TenantService,

    @Inject(PlanService)
    private readonly planService: PlanService,
  ) {}

  async execute(request: SetPlanRequest) {
    await this.planService.findByIdOrFail(request.planId);
    await this.tenantService.setPlan(request);
  }
}
