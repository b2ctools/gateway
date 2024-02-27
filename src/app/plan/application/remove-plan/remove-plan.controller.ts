import { Controller, Delete, Inject, Param } from "@nestjs/common";
import { planPath } from "../../../shared/routes";
import { RemovePlanUseCase } from "./remove-plan.usecase";
import { ID } from "../../../shared/abstract-repository/repository.interface";

@Controller(planPath)
export class RemovePlanController {
  constructor(
    @Inject(RemovePlanUseCase)
    private readonly useCase: RemovePlanUseCase,
  ) {}

  @Delete("/:id")
  async removePlan(@Param("id") id: ID) {
    await this.useCase.execute(id);
    return { message: "Plan succesfully removed" };
  }
}
