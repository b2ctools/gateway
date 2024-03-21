import { Controller, Get, Inject, Query } from "@nestjs/common";
import { SearchTenantUseCase } from "./search-tenant.usecase";
import { TenantDto } from "../../domain/tenant.interface";
import { tenantPath } from "../../../shared/routes";
import { SearchOutput, SearchRequest } from "../../../shared/filters-and-request/base.request";
import { allowedForRole } from "src/app/auth/domain/middleware/access-control";
import { UserRole } from "src/app/user/domain/user.interface";

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
    allowedForRole([UserRole.ADMIN]);
    return await this.useCase.execute(request);
  }
}
