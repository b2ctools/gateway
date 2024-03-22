import { Inject, Injectable } from "@nestjs/common";
import { PlanService } from "../../domain/plan.service";
import { UpdatePlanRequest } from "./update-plan.request";
import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { AddPlanCommand } from "../add-plan/add-plan.command";

@Injectable()
export class UpdatePlanUseCse {
  constructor(
    @Inject(PlanService)
    private readonly planService: PlanService,
  ) {}

  private async validateDefaultBillingCycle(id: ID, request: UpdatePlanRequest) {
    const plan = await this.planService.findByIdOrFail(id);
    const billing = request.billing || plan.billing;

    // this is only to run validations within the comannd.. related to defaultBillingCycle
    new AddPlanCommand({
      ...plan,
      billing: billing,
      defaultBillingCycle: request.defaultBillingCycle,
    });

    return request;
  }

  async execute(id: ID, request: UpdatePlanRequest) {
    await this.validateDefaultBillingCycle(id, request);
    return await this.planService.updatePlan(id, request);
  }
}
