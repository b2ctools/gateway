import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { MongoEntity } from "../../../shared/abstract-repository/entities/mongo-entity";
import { Tenant } from "../../domain/tenant.interface";

export class TenantMongoEntity
  extends MongoEntity
  implements Omit<Tenant, "id">
{
  name: string;
  description?: string;
  planId: ID;
}
