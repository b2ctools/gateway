import { Tenant } from "../../domain/tenant.interface";
import { AddTenantRequest } from "./add-tenant.request";

export class AddTenantCommand
  implements Omit<Tenant, "id" | "tenantId" | "planId">
{
  name: string;
  description?: string;

  constructor(request: AddTenantRequest) {
    const { name, description } = request;
    this.name = name;
    this.description = description;
  }
}
