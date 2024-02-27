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
    entity.tenantId = d.tenantId;
    entity.planId = d.planId;
    return entity;
  }

  entityToDomain(e: TenantMockedEntity): Tenant {
    return {
      id: e._id,
      name: e.name,
      description: e.description,
      tenantId: e.tenantId,
      planId: e.planId,
    };
  }

  async getTenantByName(name: string): Promise<Tenant> {
    const { data: tenants } = await this.findAll({});
    if (tenants.length === 0) return null;
    const filtered = tenants.filter((s) => s.name === name);
    return filtered.length > 0 ? filtered.shift() : null;
  }
}
