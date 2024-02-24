import { Body, Controller, Inject, Patch } from "@nestjs/common";
import { tenantPath } from "../../../shared/routes";
import { tenantToDto } from "../../domain/tenant.interface";
import { UpdateTenantUseCse } from "./update-tenant.usecase";
import { UpdateTenantRequest } from "./update-tenant.request";

@Controller(tenantPath)
export class UpdateTenantController {
  constructor(
    @Inject(UpdateTenantUseCse)
    private readonly useCase: UpdateTenantUseCse,
  ) {}

  @Patch()
  async updateTenant(@Body() request: UpdateTenantRequest) {
    const pc = await this.useCase.execute(request);
    return tenantToDto(pc);
  }
}
