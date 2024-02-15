import { Body, Controller, Inject, Post } from "@nestjs/common";
import { MoveProductCategoryUseCase } from "./move-product-category.usecase";
import { UpdateProductCategoryRequest } from "./move-product-category.request";
import { productCategoryToDto } from "../../domain/product-category.interface";
import { productCategoryPath } from "../../../shared/routes";

@Controller(productCategoryPath)
export class MoveProductCateogoryController {
  constructor(
    @Inject(MoveProductCategoryUseCase)
    private readonly useCase: MoveProductCategoryUseCase,
  ) {}

  @Post("/move")
  async moveProductCategory(@Body() request: UpdateProductCategoryRequest) {
    const { id, parent } = request;
    const pc = await this.useCase.execute({ id, parent });
    return productCategoryToDto(pc);
  }
}
