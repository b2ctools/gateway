import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { AccountService } from "../../domain/account.service";
import { SearchAccountRequest } from "./search-account.request";
import { UserService } from "../../../user/domain/user.service";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import { StoreService } from "../../../store/domain/store.service";
import {
  AccountDto,
  accountToDto,
  sortable,
} from "../../domain/account.interface";
import {
  SearchOutput,
  sanitazeSearchQueryParams,
} from "../../../shared/base.request";
import { TenantService } from "../../../tenant/domain/tenant.service";
import { PermissionService } from "src/app/permission/domain/permission.service";
import { ctxSrv } from "src/app/shared/context.service";
import { isAdmin, isOwner, isUser } from "src/app/auth/domain/middleware/access-control";

@Injectable()
export class SearchAccountUseCase {
  constructor(
    @Inject(AccountService)
    private readonly accountService: AccountService,

    @Inject(UserService)
    private readonly userService: UserService,

    @Inject(StoreService)
    private readonly storeService: StoreService,

    @Inject(TenantService)
    private readonly tenantService: TenantService,

    @Inject(PermissionService)
    private readonly permissionService: PermissionService,
  ) {}

  /**
   * if user is on request.. validate it
   * @param request 
   * @returns 
   */
  private async validateUser(request: SearchAccountRequest) {
    request = {
      ...request,
      ...((isUser() && !isOwner()) ?  { userId: ctxSrv.getUserId() } : {}),
    };
    
    if (request.userId) {
      await this.userService.findByIdOrFail(request.userId);
    }
    return request;
  }

  private async validateStore(storeId: ID) {
    if (storeId) {
      await this.storeService.findByIdOrFail(storeId);
    }
  }

  /**
   * this is to set the tenantId on the request
   * if it is an admin... tenant should be specified on the request
   * it is nto an admin, tenantId should be set from the context
   * @param request 
   * @returns 
   */
  private async setTenantId(
    request: SearchAccountRequest,
  ): Promise<SearchAccountRequest> {
  
    // if user is admin, tenantId is required
    if (isAdmin() && !request.tenantId) {
      throw new BadRequestException(
        "TenantId is required on request for admin role",
      );
    }

    request.tenantId = isAdmin() ? request.tenantId : ctxSrv.getTenantId();
    try {
      await this.tenantService.findByIdOrFail(request.tenantId);
      
    } catch (error) {
      console.error("Error on Search Account. TenantId ${request.tenantId} could not be found", error);
      throw new BadRequestException(`TenantId ${request.tenantId} could not be found. Please try to do login-account or add it on request if you are an admin. `);
    }
    
    return request;
  }

  async execute(
    request: SearchAccountRequest,
  ): Promise<SearchOutput<AccountDto>> {
    request = await this.setTenantId(request);
    request = await this.validateUser(request);
    await this.validateStore(request.storeId);

    const { count, data: accounts } = await this.accountService.findAllAccounts(
      sanitazeSearchQueryParams<SearchAccountRequest>(request, sortable),
    );

    const items = accounts.map((account) => {
      const tenantRef = this.tenantService.getTenantRef(account.tenantId);
      const storeRef = this.storeService.getStoreRef(account.storeId);
      const permissionsRef = account.permissions.map((p) =>
        this.permissionService.getPermissionRef(p),
      );
      return accountToDto(account, tenantRef, storeRef, permissionsRef);
    });
    return {
      count,
      data: items,
      sortable,
    };
  }
}
