import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { Resource, ResourseModuleType } from "../../domain/resource.interface";
import { AddResourceRequest } from "./add-resource.request";

export class AddResourceCommand implements Omit<Resource, "id" | "tenantId"> {
  name: string;
  description?: string;
  module: ResourseModuleType;
  permissions: ID[];

  constructor(request: AddResourceRequest) {
    const { name, description, module, permissions } = request;
    this.name = name;
    this.description = description;
    this.module = module;
    this.permissions = permissions;
  }

}
