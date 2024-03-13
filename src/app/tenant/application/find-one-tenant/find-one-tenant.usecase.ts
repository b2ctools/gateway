import { Inject, Injectable } from "@nestjs/common";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import { TenantDto, tenantToDto } from "../../domain/tenant.interface";
import { TenantService } from "../../domain/tenant.service";
import { UserService } from "src/app/user/domain/user.service";

@Injectable()
export class FineOneTenantUseCase {
  constructor(
    @Inject(TenantService)
    private readonly tenantService: TenantService,

    @Inject(UserService)
    private readonly userService: UserService,    
  ) {}

  private async getPrimaryOwner(userId: ID){
    try {
      return await this.userService.findByIdOrFail(userId);
    } catch (error) {
      return undefined;
    }
  }
  async execute(id: ID): Promise<TenantDto> {
    const tenant = await this.tenantService.findByIdOrFail(id);
    const owner = await this.getPrimaryOwner(tenant.primaryOwnerId);
    return tenantToDto(tenant, undefined, owner);

    return tenantToDto(tenant);
  }
}
