import { IDomain } from "../../shared/abstract-repository/entities/domain";

export interface Resource extends IDomain {
  name: string;
  description?: string;
}

export interface ResourceDto extends Resource {}

export const resourceToDto = (u: Resource): ResourceDto => ({ ...u });

export const sortable = ["name", "description"];
