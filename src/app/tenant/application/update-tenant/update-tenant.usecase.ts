import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { TenantService } from "../../domain/tenant.service";
import { UpdateTenantRequest } from "./update-tenant.request";
import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { AccountService } from "src/app/account/domain/account.service";
import { isValidTenantState } from "../../domain/tenant.interface";

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

  private validateTenantState(state: string) {
    
    if (state && !isValidTenantState(state)) {
      throw new BadRequestException("Ivalid tenant state");
    }
  
  }

  async execute(id: ID, request: UpdateTenantRequest) {
    await this.validateOwnerAccount(request);
    this.validateTenantState(request.state);
    return await this.tenantService.updateTenant(id, request);
  }
}
