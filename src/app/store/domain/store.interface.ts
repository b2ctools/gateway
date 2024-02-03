import { IDomain } from '../../shared/abstract-repository/entities/domain';

export interface Store extends IDomain {
  name: string;
  description?: string;
}

export interface StoreDto extends Store {}

export const storeToDto = (u: Store): StoreDto => ({ ...u });

export const sortable = [
  'name',
  'description',  
]