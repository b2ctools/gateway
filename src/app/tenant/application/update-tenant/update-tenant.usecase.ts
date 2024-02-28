import { Inject, Injectable } from "@nestjs/common";
import { TenantService } from "../../domain/tenant.service";
import { UpdateTenantRequest } from "./update-tenant.request";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

@Injectable()
export class UpdateTenantUseCse {
  constructor(
    @Inject(TenantService)
    private readonly tenantService: TenantService,
  ) {}

  async execute(id: ID, request: UpdateTenantRequest) {
    return await this.tenantService.updateTenant(id, request);
  }
}
