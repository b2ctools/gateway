import { codeFromId } from "../../shared/utils/gen-id";
import { IDomain } from "../../shared/abstract-repository/entities/domain";
import { ID } from "../../shared/abstract-repository/repository.interface";
import { User } from "src/app/user/domain/user.interface";

export type TenantAddress = string;
export type TenantState = 'active' | 'inactive';
export interface Tenant extends IDomain {
  name: string;
  description?: string;
  planId: ID;
  address: TenantAddress;
  logo: string;
  primaryOwnerId?: ID;
  // state: TenantState;
}

export interface TenantDto extends Omit<Tenant, "primaryOwnerId">{
  code: string;
  storeCount?: number;
  primaryOwner?: User;
}
export interface TenantRef {
  id: ID;
  name: string;
  code: string;
}

export const tenantToDto = (
  u: Tenant,
  storeCount: number = undefined,
  primaryOwner: User = undefined,
): TenantDto => {
  delete u.primaryOwnerId;
  return {
    ...u,
    code: codeFromId(u.id),
    storeCount,
    primaryOwner,
  };
};

export const sortable = ["name", "description"];
