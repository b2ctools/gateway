import { MockedEntity } from "../../../shared/abstract-repository/entities/mocked-entity";
import { Store } from "../../domain/store.interface";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

export class StoreMockedEntity
  extends MockedEntity
  implements Omit<Store, "id">
{
  name: string;
  description?: string;
  address: string;
  logo: string;
  managedBy: ID;
  tenantId: ID;
}
