import { Inject, Injectable } from '@nestjs/common';
import { ProductCategoryService } from '../../domain/product-category.service';
import { SearchSubProductCategoryRequest } from './sub-product-categories.request';
import { sanitazeSearchQueryParams } from '../../../shared/base.request';

@Injectable()
export class SubProductCategoriesUseCase {
  constructor(
    @Inject(ProductCategoryService)
    private readonly pcService: ProductCategoryService
  ) {}
  async execute(request: SearchSubProductCategoryRequest) {
    return await this.pcService.productCategoriesFromParent(sanitazeSearchQueryParams<SearchSubProductCategoryRequest>(request));
  }
}
