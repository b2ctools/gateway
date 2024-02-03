import { Inject, Injectable } from '@nestjs/common';
import { ProductCategoryService } from '../../domain/product-category.service';
import { AddProductCategoryCommand } from './add-product-category.command';

@Injectable()
export class AddProductCategoryUseCase {
  constructor(
    @Inject(ProductCategoryService)
    private readonly pcService: ProductCategoryService
  ) {}

  async addProductCategory(command: AddProductCategoryCommand){
    return await this.pcService.addProductCategory(command);
  }

  async loadFromJson(json: string){
    return await this.pcService.insertCategoriesFromJson(json);
  }
}
