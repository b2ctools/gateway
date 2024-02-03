import { Inject, Injectable } from '@nestjs/common';
import { ProductCategoryService } from '../../domain/product-category.service';
import { ID } from '../../../shared/abstract-repository/repository.interface';

@Injectable()
export class SubProductCategoriesUseCase {
  constructor(
    @Inject(ProductCategoryService)
    private readonly pcService: ProductCategoryService
  ) {}
  async execute({parent, tree = false } : {parent: ID, tree?: boolean}) {
    return await this.pcService.productCategoriesFromParent({ parent, tree });
  }
}
