
import { codeFromId } from 'src/app/shared/utils/gen-id';
import { IDomain } from '../../shared/abstract-repository/entities/domain';

export interface Tenant extends IDomain {
  name: string;
  description?: string;
}

export interface TenantDto extends Tenant {
  code: string;
}

export const tenantToDto = (u: Tenant): TenantDto => { 
  delete u.tenantId;
  return {
    ...u,
    code: codeFromId(u.id),
  }
};

export const sortable = [
  'name',
  'description',  
]
