import { Controller, Get, Inject, Query } from "@nestjs/common";
import { SearchTenantUseCase } from "./search-tenant.usecase";
import { TenantDto } from "../../domain/tenant.interface";
import { tenantPath } from "../../../shared/routes";
import { SearchOutput, SearchRequest } from "../../../shared/base.request";

@Controller(tenantPath)
export class SearchTenantController {
  constructor(
    @Inject(SearchTenantUseCase)
    private readonly useCase: SearchTenantUseCase
  ) {}

  @Get()
  async findAllTenants(
    @Query() request: SearchRequest
  ): Promise<SearchOutput<TenantDto>> {
    return await this.useCase.execute(request);
  }
}
