import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { MockedEntity } from "../../../shared/abstract-repository/entities/mocked-entity";
import { Tenant, TenantState } from "../../domain/tenant.interface";

export class TenantMockedEntity
  extends MockedEntity
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
