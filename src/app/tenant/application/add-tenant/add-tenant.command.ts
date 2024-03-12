import { Tenant, TenantState } from "../../domain/tenant.interface";
import { AddTenantRequest } from "./add-tenant.request";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

export class AddTenantCommand
  implements Omit<Tenant, "id" | "planId">
{
  name: string;
  description?: string;
  address: string;
  logo: string;
  primaryOwnerId: ID = undefined;
  state: TenantState;

  constructor(request: AddTenantRequest) {
    const { name, description, address, logo, primaryOwnerId } = request;
    this.name = name;
    this.description = description;
    this.address = address;
    this.logo = logo;
    this.primaryOwnerId = primaryOwnerId;
    this.state = "active";
  }

}
