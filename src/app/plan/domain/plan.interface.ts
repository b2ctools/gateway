
import { IDomain } from '../../shared/abstract-repository/entities/domain';

export interface Plan extends IDomain {
  name: string;
  description?: string;
}

export interface PlanDto extends Plan {}

export const planToDto = (u: Plan): PlanDto => {
  delete u.tenantId;
  return { ...u }
};

export const sortable = [
  'name',
  'description',  
]
