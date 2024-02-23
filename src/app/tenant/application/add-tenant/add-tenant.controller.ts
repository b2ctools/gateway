import { Body, Controller, Inject, Post } from "@nestjs/common";
import { tenantPath } from "../../../shared/routes";
import { AddTenantUseCase } from "./add-tenant.usecase";
import { AddTenantRequest } from "./add-tenant.request";
import { AddTenantCommand } from "./add-tenant.command";
import { tenantToDto } from "../../domain/tenant.interface";

@Controller(tenantPath)
export class AddTenantController {
  constructor(
    @Inject(AddTenantUseCase)
    private readonly useCase: AddTenantUseCase,
  ) {}

  @Post()
  async addTenant(@Body() request: AddTenantRequest) {
    const pc = await this.useCase.addTenant(new AddTenantCommand(request));
    return tenantToDto(pc);
  }
}
