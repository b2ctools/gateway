import { Injectable } from "@nestjs/common";
import { MockedRepository } from "../../../shared/abstract-repository/mocked-repository";
import { TenantMockedEntity } from "./tenant.mocked-entity";
import { Tenant } from "../../domain/tenant.interface";

@Injectable()
export class TenantMockedRepository extends MockedRepository<
  TenantMockedEntity,
  Tenant
> {
  domainToEntity(d: Tenant): TenantMockedEntity {
    const entity = new TenantMockedEntity();

    entity.name = d.name;
    entity.description = d.description;
    entity.planId = d.planId;
    entity.address = d.address;
    entity.logo = d.logo;
    entity.primaryOwnerId = d.primaryOwnerId;
    return entity;
  }

  entityToDomain(e: TenantMockedEntity): Tenant {
    return {
      id: e._id,
      name: e.name,
      description: e.description,
      planId: e.planId,
      address: e.address,
      logo: e.logo,
      primaryOwnerId: e.primaryOwnerId,
    };
  }

  async getTenantByName(name: string): Promise<Tenant> {
    const { data: tenants } = await this.findAll({});
    if (tenants.length === 0) return null;
    const filtered = tenants.filter((s) => s.name === name);
    return filtered.length > 0 ? filtered.shift() : null;
  }
}
