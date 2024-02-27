import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { IDomain } from "../../shared/abstract-repository/entities/domain";

export interface Plan extends IDomain {
  name: string;
  description?: string;
  resources: ID[];
}

export interface PlanDto extends Plan {}

export const planToDto = (u: Plan): PlanDto => {
  // delete u.tenantId;
  return { ...u };
};

export const sortable = ["name", "description"];
