import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { AccountService } from "../../domain/account.service";
import { AddAccountCommand } from "./add-account.command";
import { StoreService } from "../../../store/domain/store.service";
import { UserService } from "../../../user/domain/user.service";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import { UserRole } from "../../../user/domain/user.interface";
import { AccountDto, accountToDto } from "../../domain/account.interface";
import { TenantService } from "../../../tenant/domain/tenant.service";
import { PermissionService } from "src/app/permission/domain/permission.service";

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
    private readonly permissionService: PermissionService,
  ) {}

  private async verifyUser(userId: ID) {
    const user = await this.userService.findByIdOrFail(userId);
    if (user.role != UserRole.USER) {
      throw new BadRequestException(
        `User with role [${user.role}] is not allowed to have an account`,
      );
    }
  }

  async execute(command: AddAccountCommand): Promise<AccountDto> {
    const { storeId, userId } = command;
    // validations
    await this.storeService.findByIdOrFail(storeId);
    await this.verifyUser(userId);

    const account = await this.pcService.addAccount(command);
    // const tenantRef = this.tenantService.getTenantRef(account.tenantId);
    const storeRef = this.storeService.getStoreRef(account.storeId);
    const permissionsRef = account.permissions.map((p) =>
      this.permissionService.getPermissionRef(p),
    );
    return accountToDto(account, null, storeRef, permissionsRef);
  }
}
