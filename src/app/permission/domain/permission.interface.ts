import { IDomain } from "../../shared/abstract-repository/entities/domain";

export interface Permission extends IDomain {
  name: string;
  description?: string;
}

export interface PermissionDto extends Permission {}

export const permissionToDto = (u: Permission): PermissionDto => ({ ...u });

export const sortable = ["name", "description"];
