import { Controller, Get, Inject, Query } from "@nestjs/common";
import { SubProductCategoriesUseCase } from "./sub-product-categories.usecase";
import { productCategoryPath } from "../../../shared/routes";
import {
  SearchSubProductCategoriesOutput,
  SearchSubProductCategoryRequest,
} from "./sub-product-categories.request";

@Controller(productCategoryPath)
export class SubProductCategoriesController {
  constructor(
    @Inject(SubProductCategoriesUseCase)
    private readonly useCase: SubProductCategoriesUseCase,
  ) {}

  @Get("/sub")
  async subProductCategories(
    @Query() request: SearchSubProductCategoryRequest,
  ): Promise<SearchSubProductCategoriesOutput> {
    return await this.useCase.execute(request);
  }
}
