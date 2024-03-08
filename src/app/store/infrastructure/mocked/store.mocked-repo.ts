import { Injectable } from "@nestjs/common";
import { MockedRepository } from "../../../shared/abstract-repository/mocked-repository";
import { StoreMockedEntity } from "./store.mocked-entity";
import { Store } from "../../domain/store.interface";

@Injectable()
export class StoreMockedRepository extends MockedRepository<
  StoreMockedEntity,
  Store
> {
  domainToEntity(d: Store): StoreMockedEntity {
    const entity = new StoreMockedEntity();

    entity.name = d.name;
    entity.description = d.description;
    entity.address = d.address;
    entity.logo = d.logo;
    entity.managedBy = d.managedBy;
    entity.tenantId = d.tenantId;

    return entity;
  }

  entityToDomain(e: StoreMockedEntity): Store {
    return {
      id: e._id,
      name: e.name,
      description: e.description,
      address: e.address,
      logo: e.logo,
      managedBy: e.managedBy,
      tenantId: e.tenantId,
    };
  }

  async getStoreByName(name: string) {
    const { data: stores } = await this.findAll({});
    if (stores.length === 0) return null;
    const filtered = stores.filter((s) => s.name === name);
    return filtered.length > 0 ? filtered.shift() : null;
  }
}
