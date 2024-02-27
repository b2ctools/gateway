import { Injectable } from "@nestjs/common";
import { MongoRepository } from "../../../shared/abstract-repository/mongo-repository";
import { ResourceMongoEntity } from "./resource.mongo-entity";
import { Resource } from "../../domain/resource.interface";

@Injectable()
export class ResourceMongoRepository extends MongoRepository<
  ResourceMongoEntity,
  Resource
> {
  domainToEntity(d: Resource): ResourceMongoEntity {
    console.log(d);
    throw new Error("Method not implemented.");
  }
  entityToDomain(e: ResourceMongoEntity): Resource {
    console.log(e);
    throw new Error("Method not implemented.");
  }

  async getResourceByName(name: string): Promise<Resource> {
    console.log(name);
    throw new Error("Method not implemented.");
  }
}
