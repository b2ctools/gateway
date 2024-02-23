import { Injectable } from "@nestjs/common";
import { MongoRepository } from "../../../shared/abstract-repository/mongo-repository";
import { TenantMongoEntity } from "./tenant.mongo-entity";
import { Tenant } from "../../domain/tenant.interface";

@Injectable()
export class TenantMongoRepository extends MongoRepository<
  TenantMongoEntity,
  Tenant
> {
  domainToEntity(d: Tenant): TenantMongoEntity {
    console.log(d);
    throw new Error("Method not implemented.");
  }
  entityToDomain(e: TenantMongoEntity): Tenant {
    console.log(e);
    throw new Error("Method not implemented.");
  }

  async getTenantByName(name: string): Promise<Tenant> {
    console.log(name);
    throw new Error("Method not implemented.");
  }
}
