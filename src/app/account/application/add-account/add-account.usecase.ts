import { Inject, Injectable } from "@nestjs/common";
import { AccountService } from "../../domain/account.service";
import { AddAccountCommand } from "./add-account.command";
import { StoreService } from "../../../store/domain/store.service";
import { UserService } from "../../../user/domain/user.service";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import { AccountDto, AccountType, accountToDto } from "../../domain/account.interface";
import { TenantService } from "../../../tenant/domain/tenant.service";
import { PermissionService } from "src/app/permission/domain/permission.service";
import { UserRole } from "src/app/user/domain/user.interface";

@Injectable()
export class AddAccountUseCase {
  constructor(
    @Inject(AccountService)
    private readonly pcService: AccountService,

    @Inject(StoreService)
    private readonly storeService: StoreService,

    @Inject(UserService)
    private readonly userService: UserService,

    @Inject(TenantService)
    private readonly tenantService: TenantService,

    @Inject(PermissionService)
    private readonly permissionService: PermissionService
  ) {}

  private async verifyUser(userId: ID) {
    const { role } = await this.userService.findByIdOrFail(userId);

    // userId - role can not be admin
    if (role === UserRole.ADMIN) {
      throw new Error("Specified userId- role can not be " + UserRole.ADMIN);
    }
  }

  private async verifyTenant(tenantId: ID) {
    await this.tenantService.findByIdOrFail(tenantId);
  }

  private async verifyStore(command: AddAccountCommand) {
    const { storeId, type } = command;
    if (storeId && type === AccountType.STORE) {
      await this.storeService.findByIdOrFail(storeId);
    }
  }

  async execute(command: AddAccountCommand): Promise<AccountDto> {
    const { userId, tenantId } = command;
    // validations
    await this.verifyStore(command);
    await this.verifyUser(userId);
    await this.verifyTenant(tenantId);

    const account = await this.pcService.addAccount(command);
    const tenantRef = this.tenantService.getTenantRef(account.tenantId);
    const storeRef = this.storeService.getStoreRef(account.storeId);
    const permissionsRef = account.permissions.map((p) =>
      this.permissionService.getPermissionRef(p)
    );
    return accountToDto(account, tenantRef, storeRef, permissionsRef);
  }
}
