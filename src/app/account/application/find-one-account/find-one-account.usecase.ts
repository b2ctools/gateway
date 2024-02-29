import { Inject, Injectable } from "@nestjs/common";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import { AccountService } from "../../domain/account.service";
import { TenantService } from "../../../tenant/domain/tenant.service";
import { AccountDto, accountToDto } from "../../domain/account.interface";
import { StoreService } from "../../../store/domain/store.service";
import { PermissionService } from "src/app/permission/domain/permission.service";

@Injectable()
export class FindOneAccountUsecase {
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

  async execute(id: ID): Promise<AccountDto> {
    const account = await this.accountService.findByIdOrFail(id);
    // const tenantRef = this.tenantService.getTenantRef(account.tenantId);
    const storeRef = this.storeService.getStoreRef(account.storeId);
    const permissionsRef = account.permissions.map((p) =>
      this.permissionService.getPermissionRef(p),
    );

    return accountToDto(account, null, storeRef, permissionsRef);
  }
}
