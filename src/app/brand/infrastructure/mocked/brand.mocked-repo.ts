import { Injectable } from "@nestjs/common";
import { MockedRepository } from "../../../shared/abstract-repository/mocked-repository";
import { BrandMockedEntity } from "./brand.mocked-entity";
import { Brand } from "../../domain/brand.interface";

@Injectable()
export class BrandMockedRepository extends MockedRepository<
  BrandMockedEntity,
  Brand
> {
  domainToEntity(d: Brand): BrandMockedEntity {
    const entity = new BrandMockedEntity();
    entity.name = d.name;
    entity.description = d.description;
    entity.tenantId = d.tenantId;
    return entity;
  }

  entityToDomain(e: BrandMockedEntity): Brand {
    return {
      id: e._id,
      name: e.name,
      description: e.description,
      tenantId: e.tenantId,
    };
  }

  async getBrandByName(name: string): Promise<Brand> {
    const categories = await this.findAll({});
    if (categories.length === 0) return null;
    const filtered = categories.filter((s) => s.name === name);
    return filtered.length > 0 ? filtered.shift() : null;
  }
}
