import { Inject, Injectable } from "@nestjs/common";
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

  async execute(
    request: SearchAccountRequest
  ): Promise<SearchOutput<AccountDto>> {
    const { userId, storeId } = request;
    await this.validateUser(userId);
    await this.validateStore(storeId);
    const { count, data: accounts } = await this.accountService.findAllAccounts(
      sanitazeSearchQueryParams<SearchAccountRequest>(request, sortable)
    );

    const items = accounts.map((account) => {
      // const tenantRef = this.tenantService.getTenantRef(s.tenantId);
      const storeRef = this.storeService.getStoreRef(account.storeId);

      const permissionsRef = account.permissions.map((p) =>
        this.permissionService.getPermissionRef(p)
      );
      return accountToDto(account, null, storeRef, permissionsRef);
    });
    return {
      count,
      data: items,
      sortable,
    };
  }
}
