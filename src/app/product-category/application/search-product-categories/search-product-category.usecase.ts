import { Inject, Injectable } from "@nestjs/common";
import { ProductCategoryService } from "../../domain/product-category.service";
import { SearchProductCategoryRequest } from "./search-product-category.request";
import { sanitazeSearchQueryParams } from "../../../shared/base.request";
import { sortable } from "../../domain/product-category.interface";

@Injectable()
export class SearchProductCategoryUseCase {
  constructor(
    @Inject(ProductCategoryService)
    private readonly pcService: ProductCategoryService,
  ) {}

  async execute(request: SearchProductCategoryRequest) {
    return await this.pcService.findAllProductCategories(
      sanitazeSearchQueryParams<SearchProductCategoryRequest>(request, sortable),
    );
  }
}
