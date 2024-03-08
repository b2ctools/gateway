import { isAdmin } from "src/app/auth/domain/middleware/access-control";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import { Category } from "../../domain/category.interface";
import { AddCategoryRequest } from "./add-category.request";
import { ctxSrv } from "src/app/shared/context.service";

export class AddCategoryCommand
  implements Omit<Category, "id" | "status">
{
  name: string;
  description?: string;
  parent: ID;
  tenantId: ID;

  constructor(request: AddCategoryRequest) {
    const { name, description, parent } = request;
    this.name = name;
    this.description = description;
    this.parent = parent;
    this.tenantId = isAdmin() ? request.tenantId : ctxSrv.getTenantId();
  }
}
