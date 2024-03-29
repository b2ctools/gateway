import { ID } from "../../../shared/abstract-repository/repository.interface";
import { Account, AccountType, Scope } from "../../domain/account.interface";
import { AddAccountRequest } from "./add-account.request";
import { ctxSrv } from "src/app/shared/context.service";
import { isAdmin } from "src/app/auth/domain/middleware/access-control";

export class AddAccountCommand implements Omit<Account, "id"> {
  userId: ID;
  storeId: ID;
  scope: Scope;
  type: AccountType;
  permissions: ID[];
  tenantId: ID;
  isActive: boolean;

  constructor(request: AddAccountRequest) {
    const { userId, storeId, scope, tenantId = null } = request;
    this.userId = userId;
    this.storeId = storeId;
    this.scope = scope;
    this.type = storeId ? AccountType.STORE : AccountType.TENANT;
    this.permissions = [];
    this.tenantId =
      isAdmin() ? tenantId : ctxSrv.getTenantId();
    this.isActive = true;
  }
}
