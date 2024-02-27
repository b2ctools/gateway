import { Controller, Delete, Inject, Param } from "@nestjs/common";
import { resourcePath } from "../../../shared/routes";
import { RemoveResourceUseCase } from "./remove-resource.usecase";
import { ID } from "../../../shared/abstract-repository/repository.interface";

@Controller(resourcePath)
export class RemoveResourceController {
  constructor(
    @Inject(RemoveResourceUseCase)
    private readonly useCase: RemoveResourceUseCase,
  ) {}

  @Delete("/:id")
  async removeResource(@Param("id") id: ID) {
    await this.useCase.execute(id);
    return { message: "Resource succesfully removed" };
  }
}
