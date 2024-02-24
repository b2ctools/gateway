import { Body, Controller, Inject, Post } from "@nestjs/common";
import { MoveProductCategoryUseCase } from "./move-product-category.usecase";
import { UpdateProductCategoryRequest } from "./move-product-category.request";
import { productCategoryPath } from "../../../shared/routes";

@Controller(productCategoryPath)
export class MoveProductCateogoryController {
  constructor(
    @Inject(MoveProductCategoryUseCase)
    private readonly useCase: MoveProductCategoryUseCase,
  ) {}

  @Post("/move")
  async moveProductCategory(@Body() request: UpdateProductCategoryRequest) {
    return await this.useCase.execute(request);
  }
}
