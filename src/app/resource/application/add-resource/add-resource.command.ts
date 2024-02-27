import { Resource } from "../../domain/resource.interface";
import { AddResourceRequest } from "./add-resource.request";

export class AddResourceCommand implements Omit<Resource, "id" | "tenantId"> {
  name: string;
  description?: string;

  constructor(request: AddResourceRequest) {
    const { name, description } = request;
    this.name = name;
    this.description = description;
  }
}
