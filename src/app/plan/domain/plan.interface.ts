import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { IDomain } from "../../shared/abstract-repository/entities/domain";


export enum BillingCycle {
  MONTHLY = "month",
  YEARLY = "year",
  LIFETIME = "lifetime",
}

export interface Billing {
  price: number;
  cycle: BillingCycle;
  description?: string;
}

export enum PlanType {
  Free = "free",
  Pro = "pro",
  Custom = "custom",
}

export interface Plan extends IDomain {
  name: string;
  description?: string;
  resources: ID[];
  billing: Billing[];
  type: PlanType;
  defaultBillingCycle?: BillingCycle;
}

export interface PlanDto extends Plan {}

export const planToDto = (u: Plan, resources: string[] = null): PlanDto => {
  delete u.resources;
  return {
    ...u,
    ...(resources ? { resources } : {}),
  };
};

export const sortable = ["name", "description", "type"];
