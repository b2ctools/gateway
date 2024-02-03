import { ID } from "./abstract-repository/repository.interface";
export const DEFAULT_TENANT = 1;
/**
 * This is a class to store information that can be access from any places in the project
 */
class ContextService {
  private tenantId: ID;
  private userId: ID;

  setTenantId(tenantId: ID) {
    console.log(' >>>> Setting tenant Id <<< ')
    this.tenantId = tenantId;
  }
  getTenantId() {
    return this.tenantId;
  }
  setUserId(userId: ID) {
    this.userId = userId;
  }
  getUserId() {
    return this.userId;
  }
}

export const ctxSrv = new ContextService();
