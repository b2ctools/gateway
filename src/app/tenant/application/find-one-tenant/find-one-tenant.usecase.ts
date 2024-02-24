import { Inject, Injectable } from "@nestjs/common";
import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { TenantDto, tenantToDto } from "../../domain/tenant.interface";
import { TenantService } from "../../domain/tenant.service";

@Injectable()
export class FineOneTenantUseCase {
  constructor(
    @Inject(TenantService)
    private readonly tenantService: TenantService,
  ) {}

  async execute(id: ID): Promise<TenantDto> {
    const tenant = await this.tenantService.findByIdOrFail(id);
    return tenantToDto(tenant);
  }
}
