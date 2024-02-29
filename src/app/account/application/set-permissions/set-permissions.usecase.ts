import { Inject, Injectable } from "@nestjs/common";
import { AccountService } from "../../domain/account.service";
import { SetPermissionsRequest } from "./set-permissions.request";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import { PermissionService } from "src/app/permission/domain/permission.service";
import { StoreService } from "src/app/store/domain/store.service";
import { accountToDto } from "../../domain/account.interface";

@Injectable()
export class SetPermissionsUseCase {
  constructor(
    @Inject(AccountService)
    private readonly accountService: AccountService,

    @Inject(StoreService)
    private readonly storeService: StoreService,

    @Inject(PermissionService)
    private readonly permissionService: PermissionService,
  ) {}

  private async validatePermissions(permissions: ID[]) {
    if (permissions && permissions.length > 0) {
      await Promise.all(
        permissions.map((permission) => {
          this.permissionService.findByIdOrFail(permission);
        }),
      );
    }
  }

  async execute(id: ID, request: SetPermissionsRequest) {
    const { permissions } = request;
    await this.validatePermissions(permissions);
    const account = await this.accountService.setPermissions(id, permissions);
    const storeRef = this.storeService.getStoreRef(account.storeId);
    const permissionsRef = account.permissions.map((p) =>
      this.permissionService.getPermissionRef(p),
    );
    return accountToDto(account, null, storeRef, permissionsRef);
  }
}
