import { Inject, Injectable } from '@nestjs/common';
import { ProductCategoryService } from '../../domain/product-category.service';
import { ID } from '../../../shared/abstract-repository/repository.interface';

@Injectable()
export class MoveProductCategoryUseCase {
  constructor(
    @Inject(ProductCategoryService)
    private readonly pcService: ProductCategoryService
  ) {}

  async execute({ id, parent }: { id: ID; parent?: ID }) {
    return await this.pcService.updateProductCategory({ id, parent });
  }
}
