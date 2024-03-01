import { ID } from "../../shared/abstract-repository/repository.interface";
import { IDomain } from "../../shared/abstract-repository/entities/domain";

export interface Customer extends IDomain {
  userId: ID;
  description?: string;
}

export interface CustomerDto extends Customer {}

export const customerToDto = (u: Customer): CustomerDto => ({ ...u });

export const sortable = ["name", "description"];
