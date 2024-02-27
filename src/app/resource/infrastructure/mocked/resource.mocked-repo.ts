import { Injectable } from "@nestjs/common";
import { MockedRepository } from "../../../shared/abstract-repository/mocked-repository";
import { ResourceMockedEntity } from "./resource.mocked-entity";
import { Resource } from "../../domain/resource.interface";

@Injectable()
export class ResourceMockedRepository extends MockedRepository<
  ResourceMockedEntity,
  Resource
> {
  domainToEntity(d: Resource): ResourceMockedEntity {
    const entity = new ResourceMockedEntity();

    entity.name = d.name;
    entity.description = d.description;
    return entity;
  }

  entityToDomain(e: ResourceMockedEntity): Resource {
    return {
      id: e._id,
      name: e.name,
      description: e.description,
    };
  }

  async getResourceByName(name: string): Promise<Resource> {
    const { data: resources } = await this.findAll({});
    if (resources.length === 0) return null;
    const filtered = resources.filter((s) => s.name === name);
    return filtered.length > 0 ? filtered.shift() : null;
  }
}
