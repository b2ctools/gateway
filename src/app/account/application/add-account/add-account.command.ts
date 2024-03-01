import { UserRole } from "src/app/user/domain/user.interface";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import { Account, AccountType, Scope } from "../../domain/account.interface";
import { AddAccountRequest } from "./add-account.request";
import { ctxSrv } from "src/app/shared/context.service";

export class AddAccountCommand
  implements Omit<Account, "id">
{
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
    this.type = storeId ? "store" : "tenant";
    this.permissions = [];
    this.tenantId = ctxSrv.getUserRole() === UserRole.ADMIN ? tenantId : ctxSrv.getTenantId();
    this.isActive = true;
  }
}
