import { Body, Controller, Inject, Param, Patch } from "@nestjs/common";
import { UpdateCategoryUseCse } from "./update-category.usecase";
import { UpdateCategoryRequest } from "./update-category.request";
import { categoryPath } from "../../../shared/routes";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

@Controller(categoryPath)
export class UpdateCategoryController {
  constructor(
    @Inject(UpdateCategoryUseCse)
    private readonly useCase: UpdateCategoryUseCse,
  ) {}

  @Patch(":id")
  async updateCategory(
    @Param("id") id: ID,
    @Body() request: UpdateCategoryRequest,
  ) {
    return await this.useCase.execute(id, request);
  }
}
