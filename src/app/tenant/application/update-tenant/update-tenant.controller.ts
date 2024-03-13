import { Body, Controller, Inject, Param, Patch } from "@nestjs/common";
import { tenantPath } from "../../../shared/routes";
import { TenantDto } from "../../domain/tenant.interface";
import { UpdateTenantUseCse } from "./update-tenant.usecase";
import { UpdateTenantRequest } from "./update-tenant.request";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

@Controller(tenantPath)
export class UpdateTenantController {
  constructor(
    @Inject(UpdateTenantUseCse)
    private readonly useCase: UpdateTenantUseCse,
  ) {}

  @Patch(":id")
  async updateTenant(
    @Param("id") id: ID,
    @Body() request: UpdateTenantRequest,
  ): Promise<TenantDto> {
    return await this.useCase.execute(id, request);

  }
}
