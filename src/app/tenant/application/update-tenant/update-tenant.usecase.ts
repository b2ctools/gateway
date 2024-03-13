import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { TenantService } from "../../domain/tenant.service";
import { UpdateTenantRequest } from "./update-tenant.request";
import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { TenantDto, isValidTenantState, tenantToDto } from "../../domain/tenant.interface";
import { UserService } from "../../../user/domain/user.service";

@Injectable()
export class UpdateTenantUseCse {
  constructor(
    @Inject(TenantService)
    private readonly tenantService: TenantService,

    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  private async validateOwnerUser(request: UpdateTenantRequest) {
    if (request.primaryOwnerId) {
      await this.userService.findByIdOrFail(
        request.primaryOwnerId,
      );
    }
  }

  private async getPrimaryOwner(userId: ID){
    try {
      return await this.userService.findByIdOrFail(userId);
    } catch (error) {
      return undefined;
    }
  }

  private validateTenantState(state: string) {
    
    if (state && !isValidTenantState(state)) {
      throw new BadRequestException("Ivalid tenant state");
    }
  
  }

  async execute(id: ID, request: UpdateTenantRequest): Promise<TenantDto> {
    await this.validateOwnerUser(request);
    this.validateTenantState(request.state);
    const tenant = await this.tenantService.updateTenant(id, request);
    const owner = await this.getPrimaryOwner(tenant.primaryOwnerId);
    return tenantToDto(tenant, undefined, owner);
  }
}
