import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { IDomain } from "../../shared/abstract-repository/entities/domain";

export type ResourseModuleType = "user" | "product" | "billing" | "delivery";

export interface Resource extends IDomain {
  name: string;
  module: ResourseModuleType;
  permissions: ID[];
  description?: string;
}

export interface ResourceDto extends Resource {}

export const resourceToDto = (u: Resource): ResourceDto => ({ ...u });

export const sortable = ["name", "description"];
