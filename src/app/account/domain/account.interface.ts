import { ID } from "../../shared/abstract-repository/repository.interface";
import { IDomain } from "../../shared/abstract-repository/entities/domain";

export enum Scope {
  STORE_ADMIN = "STORE_ADMIN",
  DELIVERY_MANAGER = "DELIVERY_MANAGER",
}

export interface Account extends IDomain {
  userId: ID;
  storeId: ID;
  permissions: ID[];
  scope: Scope;
}

export interface AccountDto extends Account {
  code: string;
}

export const accountToDto = (u: Account): AccountDto => {
  return {
    ...u,
    code: u.id as string,
  };
};

export const sortable = ["storeId"];
