import { Body, Controller, Inject, Post } from "@nestjs/common";
import { MoveCategoryUseCase } from "./move-category.usecase";
import { UpdateCategoryRequest } from "./move-category.request";
import { categoryPath } from "../../../shared/routes";

@Controller(categoryPath)
export class MoveProductCateogoryController {
  constructor(
    @Inject(MoveCategoryUseCase)
    private readonly useCase: MoveCategoryUseCase,
  ) {}

  @Post("/move")
  async moveCategory(@Body() request: UpdateCategoryRequest) {
    return await this.useCase.execute(request);
  }
}
