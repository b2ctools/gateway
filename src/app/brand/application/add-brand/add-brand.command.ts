
import { Brand } from '../../domain/brand.interface';
import { AddBrandRequest } from './add-brand.request';

export class AddBrandCommand
  implements Omit<Brand, 'id' | 'tenantId'>
{
  name: string;
  description?: string;

  constructor(request: AddBrandRequest) {
    const { name, description } = request;
    this.name = name;
    this.description = description;
  }
}
