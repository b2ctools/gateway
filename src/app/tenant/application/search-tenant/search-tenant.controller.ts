import { Controller, Get, Inject, Query } from "@nestjs/common";
import { SearchTenantUseCase } from "./search-tenant.usecase";
import {
  TenantDto,
  sortable,
  tenantToDto,
} from "../../domain/tenant.interface";
import { tenantPath } from "../../../shared/routes";
import { SearchOutput, SearchRequest } from "../../../shared/base.request";

@Controller(tenantPath)
export class SearchTenantController {
  constructor(
    @Inject(SearchTenantUseCase)
    private readonly useCase: SearchTenantUseCase,
  ) {}

  @Get()
  async findAllTenants(
    @Query() request: SearchRequest,
  ): Promise<SearchOutput<TenantDto>> {
    const { data: tenants } = await this.useCase.execute(request);
    const items = tenants.map((s) => tenantToDto(s));
    return {
      count: items.length,
      data: items,
      sortable,
    };
  }
}
