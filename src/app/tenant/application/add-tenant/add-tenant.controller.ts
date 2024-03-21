import { Body, Controller, Inject, Post } from "@nestjs/common";
import { tenantPath } from "../../../shared/routes";
import { AddTenantUseCase } from "./add-tenant.usecase";
import { AddTenantRequest } from "./add-tenant.request";
import { AddTenantCommand } from "./add-tenant.command";
import { tenantToDto } from "../../domain/tenant.interface";
import { allowedForRole } from "src/app/auth/domain/middleware/access-control";
import { UserRole } from "src/app/user/domain/user.interface";

@Controller(tenantPath)
export class AddTenantController {
  constructor(
    @Inject(AddTenantUseCase)
    private readonly useCase: AddTenantUseCase,
  ) {}

  @Post()
  async addTenant(@Body() request: AddTenantRequest) {
    allowedForRole([UserRole.ADMIN])
    const pc = await this.useCase.addTenant(new AddTenantCommand(request));
    return tenantToDto(pc);
  }
}
