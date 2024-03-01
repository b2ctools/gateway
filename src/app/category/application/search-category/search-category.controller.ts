import { Controller, Get, Inject, Query } from "@nestjs/common";
import { SearchCategoryUseCase } from "./search-category.usecase";
import { categoryPath } from "../../../shared/routes";
import {
  SearchCategoryOutput,
  SearchCategoryRequest,
} from "./search-category.request";

@Controller(categoryPath)
export class SearchCategoryController {
  constructor(
    @Inject(SearchCategoryUseCase)
    private readonly useCase: SearchCategoryUseCase,
  ) {}

  @Get()
  async searchCategories(
    @Query() request: SearchCategoryRequest,
  ): Promise<SearchCategoryOutput> {
    return await this.useCase.execute(request);
  }
}
