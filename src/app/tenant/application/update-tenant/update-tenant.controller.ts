import { Body, Controller, Inject, Param, Patch } from "@nestjs/common";
import { tenantPath } from "../../../shared/routes";
import { tenantToDto } from "../../domain/tenant.interface";
import { UpdateTenantUseCse } from "./update-tenant.usecase";
import { UpdateTenantRequest } from "./update-tenant.request";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

@Controller(tenantPath)
export class UpdateTenantController {
  constructor(
    @Inject(UpdateTenantUseCse)
    private readonly useCase: UpdateTenantUseCse,
  ) {}

  @Patch()
  async updateTenant(@Param("id") id: ID, @Body() request: UpdateTenantRequest) {
    const pc = await this.useCase.execute(id, request);
    return tenantToDto(pc);
  }
}
