import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { MongoEntity } from "../../../shared/abstract-repository/entities/mongo-entity";
import { Account, Scope } from "../../domain/account.interface";

export class AccountMongoEntity
  extends MongoEntity
  implements Omit<Account, "id">
{
  userId: ID;
  storeId: ID;
  permissions: ID[];
  scope: Scope;
}
