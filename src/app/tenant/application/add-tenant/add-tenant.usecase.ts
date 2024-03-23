import { Inject, Injectable } from "@nestjs/common";
import { TenantService } from "../../domain/tenant.service";
import { AddTenantCommand } from "./add-tenant.command";
import { TenantDto, tenantToDto } from "../../domain/tenant.interface";

@Injectable()
export class AddTenantUseCase {
  constructor(
    @Inject(TenantService)
    private readonly pcService: TenantService,
  ) {}

  async execute(command: AddTenantCommand): Promise<TenantDto> {
    const tenant = await this.pcService.addTenant(command);
    return tenantToDto(tenant);
  }
}
