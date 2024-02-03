
import { IDomain } from '../../shared/abstract-repository/entities/domain';

export interface Brand extends IDomain {
  name: string;
  description?: string;
}

export interface BrandDto extends Brand {}

export const brandToDto = (u: Brand): BrandDto => ({ ...u });

export const sortable = [
  'name',
  'description',  
]
