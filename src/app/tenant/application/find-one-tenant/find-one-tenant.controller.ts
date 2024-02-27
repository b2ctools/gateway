import { Controller, Get, Inject, Param } from "@nestjs/common";
import { tenantPath } from "../../../shared/routes";
import { FineOneTenantUseCase } from "./find-one-tenant.usecase";

@Controller(tenantPath)
export class FindOneTenantController {
  constructor(
    @Inject(FineOneTenantUseCase)
    private readonly useCase: FineOneTenantUseCase,
  ) {}

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.useCase.execute(id);
  }
}
