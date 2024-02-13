import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { AccountService } from "../../domain/account.service";
import { SetPermissionsRequest } from "./set-permissions.request";
import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { isValidPermission } from "src/app/access/domain/permissions";

@Injectable()
export class SetPermissionsUseCase {
  constructor(
    @Inject(AccountService)
    private readonly accountService: AccountService
  ) {}

  private validatePermissions(permissions: ID[]) {
    
    permissions.forEach((permission: ID) => {
      if (!isValidPermission(permission)) {
        throw new BadRequestException(`Permission with id [${permission}] is no valid.`);
      }
    });
  }

  async execute(request: SetPermissionsRequest) {
    const { id, permissions } = request;
    this.validatePermissions(permissions);
    
    return await this.accountService.setPermissions(id, permissions);
  }
}
