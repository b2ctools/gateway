import { codeFromId } from "../../shared/utils/gen-id";
import { IDomain } from "../../shared/abstract-repository/entities/domain";
import { ID } from "../../shared/abstract-repository/repository.interface";
import { User } from "src/app/user/domain/user.interface";

export type TenantAddress = string;
export type TenantState = 'active' | 'inactive';
export const isValidTenantState = (s: string) => ['active', 'inactive'].includes(s);
export interface Tenant extends IDomain {
  name: string;
  description?: string;
  planId: ID;
  address: TenantAddress;
  logo: string;
  primaryOwnerId?: ID;
  state: TenantState;
}

export interface TenantDto extends Omit<Tenant, "primaryOwnerId">{
  code: string;
  storeCount?: number;
  primaryOwner?: {
    id: ID;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  userCount?: number;
}
export interface TenantRef {
  id: ID;
  name: string;
  code: string;
}

const primaryOwnerTenantRef = (user: User) => ({
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  phone: user.phone,
});

export const tenantToDto = (
  u: Tenant,
  storeCount: number = undefined,
  primaryOwner: User = undefined,
  userCount: number = undefined,
): TenantDto => {
  delete u.primaryOwnerId;
  return {
    ...u,
    code: codeFromId(u.id),
    storeCount,
    ...(primaryOwner ? { primaryOwner: primaryOwnerTenantRef(primaryOwner) } : {}),
    userCount,
  };
};

export const sortable = ["name", "description"];
