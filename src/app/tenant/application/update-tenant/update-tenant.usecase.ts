import { Inject, Injectable } from "@nestjs/common";
import { TenantService } from "../../domain/tenant.service";
import { UpdateTenantRequest } from "./update-tenant.request";

@Injectable()
export class UpdateTenantUseCse {
  constructor(
    @Inject(TenantService)
    private readonly tenantService: TenantService,
  ) {}

  async execute(request: UpdateTenantRequest) {
    return await this.tenantService.updateTenant(request);
  }
}
