import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { MongoEntity } from "../../../shared/abstract-repository/entities/mongo-entity";
import { Tenant, TenantState } from "../../domain/tenant.interface";

export class TenantMongoEntity
  extends MongoEntity
  implements Omit<Tenant, "id">
{
  name: string;
  description?: string;
  planId: ID;
  address: string;
  logo: string;
  primaryOwnerId: ID;
  state: TenantState;
}
