import { ID } from '../../../shared/abstract-repository/repository.interface';
import { ProductCategory } from '../../domain/product-category.interface';
import { AddProductCategoryRequest } from './add-product-category.request';

export class AddProductCategoryCommand
  implements Omit<ProductCategory, 'id' | 'tenantId'>
{
  name: string;
  description?: string;
  parent: ID;

  constructor(request: AddProductCategoryRequest) {
    const { name, description, parent } = request;
    this.name = name;
    this.description = description;
    this.parent = parent;
  }
}
