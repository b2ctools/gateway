import { Body, Controller, Inject, Param, Patch } from "@nestjs/common";
import { tenantPath } from "../../../shared/routes";
import { TenantDto } from "../../domain/tenant.interface";
import { UpdateTenantUseCse } from "./update-tenant.usecase";
import { UpdateTenantRequest } from "./update-tenant.request";
import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { UserRole } from "src/app/user/domain/user.interface";
import { allowedForRole } from "src/app/auth/domain/middleware/access-control";

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
    allowedForRole([UserRole.ADMIN])
    return await this.useCase.execute(id, request);
  }
}
