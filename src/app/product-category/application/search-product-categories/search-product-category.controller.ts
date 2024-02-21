import { Controller, Get, Inject, Query } from "@nestjs/common";
import { SearchProductCategoryUseCase } from "./search-product-category.usecase";
import {
  productCategoryToDto,
  sortable,
} from "../../domain/product-category.interface";
import { productCategoryPath } from "../../../shared/routes";
import {
  SearchProductCategoryOutput,
  SearchProductCategoryRequest,
} from "./search-product-category.request";

@Controller(productCategoryPath)
export class SearchProductCategoryController {
  constructor(
    @Inject(SearchProductCategoryUseCase)
    private readonly useCase: SearchProductCategoryUseCase,
  ) {}

  @Get()
  async searchProductCategories(
    @Query() request: SearchProductCategoryRequest,
  ): Promise<SearchProductCategoryOutput> {
    const { data: pcs } = await this.useCase.execute(request);
    const data = pcs.map((pc) => productCategoryToDto(pc));
    return {
      data,
      count: data.length,
      sortable,
    };
  }
}
