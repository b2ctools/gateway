import { Inject, Injectable } from "@nestjs/common";
import { TenantService } from "../../domain/tenant.service";
import { UpdateTenantRequest } from "./update-tenant.request";
import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { AccountService } from "src/app/account/domain/account.service";

@Injectable()
export class UpdateTenantUseCse {
  constructor(
    @Inject(TenantService)
    private readonly tenantService: TenantService,

    @Inject(AccountService)
    private readonly accountService: AccountService,
  ) {}

  private async validateOwnerAccount(request: UpdateTenantRequest) {
    if (request.primaryOwnerId) {
      await this.accountService.findByIdOrFail(
        request.primaryOwnerId,
      );
    }
  }

  async execute(id: ID, request: UpdateTenantRequest) {
    await this.validateOwnerAccount(request);
    return await this.tenantService.updateTenant(id, request);
  }
}
