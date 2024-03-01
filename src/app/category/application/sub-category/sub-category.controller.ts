import { Controller, Get, Inject, Query } from "@nestjs/common";
import { SubCategoriesUseCase } from "./sub-category.usecase";
import { categoryPath } from "../../../shared/routes";
import {
  SearchSubCategoriesOutput,
  SearchSubCategoryRequest,
} from "./sub-category.request";

@Controller(categoryPath)
export class SubCategoriesController {
  constructor(
    @Inject(SubCategoriesUseCase)
    private readonly useCase: SubCategoriesUseCase,
  ) {}

  @Get("/sub")
  async subCategories(
    @Query() request: SearchSubCategoryRequest,
  ): Promise<SearchSubCategoriesOutput> {
    return await this.useCase.execute(request);
  }
}
