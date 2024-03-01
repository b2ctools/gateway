import { ID } from "../../../shared/abstract-repository/repository.interface";
import { Category } from "../../domain/category.interface";
import { AddCategoryRequest } from "./add-category.request";

export class AddCategoryCommand
  implements Omit<Category, "id" | "tenantId" | "status">
{
  name: string;
  description?: string;
  parent: ID;

  constructor(request: AddCategoryRequest) {
    const { name, description, parent } = request;
    this.name = name;
    this.description = description;
    this.parent = parent;
  }
}
