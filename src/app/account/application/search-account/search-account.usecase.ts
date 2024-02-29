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
import { UserRole } from "src/app/user/domain/user.interface";

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
    private readonly permissionService: PermissionService
  ) {}

  private async validateUser(userId: ID) {
    if (userId) {
      await this.userService.findByIdOrFail(userId);
      return;
    }
  }

  private async validateStore(storeId: ID) {
    if (storeId) {
      await this.storeService.findByIdOrFail(storeId);
      return;
    }
  }

  private async setTenantId(request: SearchAccountRequest): Promise<SearchAccountRequest> {
    // if user is admin, tenantId is required
    if (ctxSrv.getUserRole() === UserRole.ADMIN && !request.tenantId){
      throw new BadRequestException('TenantId is required on request for admin role');
    }
    
    // if user is admin, tenantId should be on request
    if (ctxSrv.getUserRole() === UserRole.ADMIN){
      // if tenantId is on request, validate it
      await this.tenantService.findByIdOrFail(request.tenantId);
      return request;
    }
    
    // if user is not admin, tenantId should come from context (token)
    const tenantId  = ctxSrv.getTenantId()
    return { ...request, tenantId };
  }

  async execute(
    request: SearchAccountRequest
  ): Promise<SearchOutput<AccountDto>> {
    request = await this.setTenantId(request);
    const { userId, storeId } = request;
    await this.validateUser(userId);
    await this.validateStore(storeId);
    const { count, data: accounts } = await this.accountService.findAllAccounts(
      sanitazeSearchQueryParams<SearchAccountRequest>(request, sortable)
    );

    const items = accounts.map((account) => {
      const tenantRef = this.tenantService.getTenantRef(account.tenantId);
      const storeRef = this.storeService.getStoreRef(account.storeId);

      const permissionsRef = account.permissions.map((p) =>
        this.permissionService.getPermissionRef(p)
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
