import { Controller, Get, Inject, Param } from "@nestjs/common";
import { planPath } from "src/app/shared/routes";
import { FindOnePlanUseCase } from "./find-one-plan.usecase";
import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { PlanDto } from "../../domain/plan.interface";

@Controller(planPath)
export class FindOnePlanController {
    constructor(
        @Inject(FindOnePlanUseCase)
        private readonly useCase: FindOnePlanUseCase
    ) {}

    @Get(":id")
    async findOne(@Param("id") id: ID): Promise<PlanDto> {
        return await this.useCase.execute(id);
    }
}