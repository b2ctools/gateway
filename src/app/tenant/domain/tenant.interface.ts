import { codeFromId } from "../../shared/utils/gen-id";
import { IDomain } from "../../shared/abstract-repository/entities/domain";
import { ID } from "../../shared/abstract-repository/repository.interface";

export interface Tenant extends IDomain {
  name: string;
  description?: string;
  planId: ID;
}

export interface TenantDto extends Tenant {
  code: string;
}
export interface TenantRef {
  id: ID;
  name: string;
  code: string;
}

export const tenantToDto = (u: Tenant): TenantDto => {
  // delete u.tenantId;
  return {
    ...u,
    code: codeFromId(u.id),
  };
};

export const sortable = ["name", "description"];
