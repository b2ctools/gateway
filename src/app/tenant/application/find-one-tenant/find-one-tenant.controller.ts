import { Controller, Get, Inject, Param } from "@nestjs/common";
import { tenantPath } from "../../../shared/routes";
import { FineOneTenantUseCase } from "./find-one-tenant.usecase";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

@Controller(tenantPath)
export class FindOneTenantController {
  constructor(
    @Inject(FineOneTenantUseCase)
    private readonly useCase: FineOneTenantUseCase,
  ) {}

  @Get(":id")
  async findOne(@Param("id") id: ID) {
    return await this.useCase.execute(id);
  }
}
