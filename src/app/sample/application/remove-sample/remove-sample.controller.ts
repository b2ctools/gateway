import { Controller, Delete, Inject, Param } from "@nestjs/common";
import { samplePath } from "../../../shared/routes";
import { RemoveSampleUseCase } from "./remove-sample.usecase";
import { ID } from "../../../shared/abstract-repository/repository.interface";

@Controller(samplePath)
export class RemoveSampleController {
  constructor(
    @Inject(RemoveSampleUseCase)
    private readonly useCase: RemoveSampleUseCase,
  ) {}

  @Delete("/:id")
  async removeSample(@Param("id") id: ID) {
    await this.useCase.execute(id);
    return { message: "Sample succesfully removed" };
  }
}
