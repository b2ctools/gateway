import { Inject, Injectable } from "@nestjs/common";
import { AccountService } from "../../domain/account.service";
import { SetPermissionsRequest } from "./set-permissions.request";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import { PermissionService } from "src/app/permission/domain/permission.service";

@Injectable()
export class SetPermissionsUseCase {
  constructor(
    @Inject(AccountService)
    private readonly accountService: AccountService,

    @Inject(PermissionService)
    private readonly permissionService: PermissionService,
  ) {}

  private async validatePermissions(permissions: ID[]) {
    if (permissions && permissions.length > 0) {
      await Promise.all(
        permissions.map((permission) => {
          this.permissionService.findByIdOrFail(permission);
        })
      )
    }
  }

  async execute(id: ID, request: SetPermissionsRequest) {
    const { permissions } = request;
    await this.validatePermissions(permissions);
    return await this.accountService.setPermissions(id, permissions);
  }
}
