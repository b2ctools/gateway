import { Controller, Delete, Inject, Param } from "@nestjs/common";
import { tenantPath } from "../../../shared/routes";
import { RemoveTenantUseCase } from "./remove-tenant.usecase";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import { UserRole } from "src/app/user/domain/user.interface";
import { allowedForRole } from "src/app/auth/domain/middleware/access-control";

@Controller(tenantPath)
export class RemoveTenantController {
  constructor(
    @Inject(RemoveTenantUseCase)
    private readonly useCase: RemoveTenantUseCase,
  ) {}

  @Delete("/:id")
  async removeTenant(@Param("id") id: ID) {
    allowedForRole([UserRole.ADMIN])
    await this.useCase.execute(id);
    return { message: "Tenant succesfully removed" };
  }
}
