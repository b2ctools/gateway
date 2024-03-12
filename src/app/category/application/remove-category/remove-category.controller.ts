import { Controller, Delete, Inject, Param } from "@nestjs/common";
import { categoryPath } from "../../../shared/routes";
import { RemoveCategoryUseCase } from "./remove-category.usecase";
import { ID } from "../../../shared/abstract-repository/repository.interface";

@Controller(categoryPath)
export class RemoveCategoryController {
  constructor(
    @Inject(RemoveCategoryUseCase)
    private readonly useCase: RemoveCategoryUseCase,
  ) {}

  @Delete("/:id")
  async removeCategory(@Param("id") id: ID) {
    await this.useCase.execute(id);
    return { message: "Category succesfully removed" };
  }
}
