import { AccountType, Scope } from "../account/domain/account.interface";
import { UserRole } from "../user/domain/user.interface";
import { ID } from "./abstract-repository/repository.interface";
export const DEFAULT_TENANT = 1;
/**
 * This is a class to store information that can be access from any places in the project
 */
class ContextService {
  private tenantId: ID;
  private userId: ID;
  private userRole: UserRole;
  private storeId: ID;
  private type: AccountType;
  private scope: Scope;
  private permissions: ID[];
  private session: string;

  constructor() {
    this.setTenantId(DEFAULT_TENANT);
  }

  // tenantId
  setTenantId(tenantId: ID) {
    this.tenantId = tenantId;
  }
  getTenantId() {
    return this.tenantId;
  }

  // userId
  setUserId(userId: ID) {
    this.userId = userId;
  }
  getUserId() {
    return this.userId;
  }

  // user role
  setUserRole(userRole: UserRole) {
    this.userRole = userRole;
  }
  getUserRole() {
    return this.userRole;
  }

  // session
  setSession(session: string) {
    this.session = session;
  }
  getSession() {
    return this.session;
  }


  // storeId
  setStoreId(storeId: ID) {
    this.storeId = storeId;
  }
  getStoreId() {
    return this.storeId;
  }

  // type
  setType(type: AccountType) {
    this.type = type;
  }
  getType() {
    return this.type;
  }

  // scope
  setScope(scope: Scope) {
    this.scope = scope;
  }
  getScope() {
    return this.scope;
  }

  // permissions
  setPermissions(permissions: ID[]) {
    this.permissions = permissions;
  }
  getPermissions() {
    return this.permissions;
  }

}

export const ctxSrv = new ContextService();
