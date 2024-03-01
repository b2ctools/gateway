import { Inject, Injectable } from "@nestjs/common";
import { AccountService } from "../../domain/account.service";
import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { AccountDto, accountToDto } from "../../domain/account.interface";
import { StoreService } from "src/app/store/domain/store.service";
import { TenantService } from "src/app/tenant/domain/tenant.service";
import { PermissionService } from "src/app/permission/domain/permission.service";

@Injectable()
export class SetActiveUseCase {
  constructor(
    @Inject(AccountService)
    private readonly accountService: AccountService,

    @Inject(StoreService)
    private readonly storeService: StoreService,

    @Inject(TenantService)
    private readonly tenantService: TenantService,

    @Inject(PermissionService)
    private readonly permissionService: PermissionService,
  ) {}

  async execute(id: ID, active: boolean): Promise<AccountDto> {
    const account = await this.accountService.setActive(id, active);
    const tenantRef = this.tenantService.getTenantRef(account.tenantId);
    const storeRef = this.storeService.getStoreRef(account.storeId);
    const permissionsRef = account.permissions.map((p) =>
      this.permissionService.getPermissionRef(p),
    );

    return accountToDto(account, tenantRef, storeRef, permissionsRef);
  }
}
