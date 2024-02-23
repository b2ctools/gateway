
import { ID } from '../../../shared/abstract-repository/repository.interface';
import { Tenant } from '../../domain/tenant.interface';
import { AddTenantRequest } from './add-tenant.request';

export class AddTenantCommand
  implements Omit<Tenant, 'id' | 'tenantId'>
{
  name: string;
  description?: string;
  parent: ID;

  constructor(request: AddTenantRequest) {
    const { name, description } = request;
    this.name = name;
    this.description = description;
  }
}
