
import { ID } from 'src/app/shared/abstract-repository/repository.interface';
import { IDomain } from '../../shared/abstract-repository/entities/domain';

export enum Scope {
  STORE_ADMIN = 'STORE_ADMIN',
  DELIVERY_MANAGER = 'DELIVERY_MANAGER',
};

export interface Account extends IDomain {
  userId: ID;
  storeId: ID;
  permissions: ID[];
  scope: Scope;
}

export interface AccountDto extends Account {}

export const accountToDto = (u: Account): AccountDto => ({ ...u });

export const sortable = [
  'storeId',
]
