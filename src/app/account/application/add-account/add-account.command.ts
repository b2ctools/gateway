import { ID } from "../../../shared/abstract-repository/repository.interface";
import { Account, AccountType, Scope } from "../../domain/account.interface";
import { AddAccountRequest } from "./add-account.request";

export class AddAccountCommand
  implements Omit<Account, "id" | "tenantId">
{
  userId: ID;
  storeId: ID;
  scope: Scope;
  type: AccountType;
  permissions: ID[];

  constructor(request: AddAccountRequest) {
    const { userId, storeId, scope } = request;
    this.userId = userId;
    this.storeId = storeId;
    this.scope = scope;
    this.type = storeId ? "store" : "tenant";
    this.permissions = [];
  }
}
