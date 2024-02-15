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
    entity.tenantId = d.tenantId;

    return entity;
  }

  entityToDomain(e: StoreMockedEntity): Store {
    return {
      id: e._id,
      name: e.name,
      description: e.description,
      tenantId: e.tenantId,
    };
  }

  async getStoreByName(name: string) {
    const stores = await this.findAll({});
    if (stores.length === 0) return null;
    const filtered = stores.filter((s) => s.name === name);
    return filtered.length > 0 ? filtered.shift() : null;
  }
}
