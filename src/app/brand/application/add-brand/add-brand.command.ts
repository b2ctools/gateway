
import { ID } from '../../../shared/abstract-repository/repository.interface';
import { Brand } from '../../domain/brand.interface';
import { AddBrandRequest } from './add-brand.request';

export class AddBrandCommand
  implements Omit<Brand, 'id' | 'tenantId'>
{
  name: string;
  description?: string;
  parent: ID;

  constructor(request: AddBrandRequest) {
    const { name, description } = request;
    this.name = name;
    this.description = description;
  }
}
