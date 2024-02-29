import { ID } from "../../../shared/abstract-repository/repository.interface";
import { MockedEntity } from "../../../shared/abstract-repository/entities/mocked-entity";
import { Account, AccountType, Scope } from "../../domain/account.interface";

export class AccountMockedEntity
  extends MockedEntity
  implements Omit<Account, "id">
{
  userId: ID;
  storeId: ID;
  permissions: ID[];
  scope: Scope;
  type: AccountType;
}
