import { Inject, Injectable } from "@nestjs/common";
import { PlanService } from "../../domain/plan.service";
import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { PlanDto, planToDto } from "../../domain/plan.interface";

@Injectable()
export class FindOnePlanUseCase {
    constructor(
        @Inject(PlanService)
        private readonly planService: PlanService
    ) {}
    
    async execute(id: ID): Promise<PlanDto> {
        const plan = await this.planService.findByIdOrFail(id);
        return planToDto(plan);
    }
}