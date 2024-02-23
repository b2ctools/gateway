import { Module } from "@nestjs/common";
import { getTenantRepo } from "./infrastructure/tenant.repo-provider";
import { AddTenantController } from "./application/add-tenant/add-tenant.controller";
import { AddTenantUseCase } from "./application/add-tenant/add-tenant.usecase";
import { TenantService } from "./domain/tenant.service";
import { SearchTenantController } from "./application/search-tenant/search-tenant.controller";
import { SearchTenantUseCase } from "./application/search-tenant/search-tenant.usecase";
import { RemoveTenantController } from "./application/remove-tenant/remove-tenant.controller";
import { RemoveTenantUseCase } from "./application/remove-tenant/remove-tenant.usecase";
import { UpdateTenantController } from "./application/update-tenant/update-tenant.controller";
import { UpdateTenantUseCse } from "./application/update-tenant/update-tenant.usecase";

@Module({
  imports: [],
  controllers: [
    AddTenantController,
    SearchTenantController,
    RemoveTenantController,
    UpdateTenantController,
  ],
  providers: [
    AddTenantUseCase,
    SearchTenantUseCase,
    RemoveTenantUseCase,
    UpdateTenantUseCse,
    TenantService,
    getTenantRepo(),
  ],
  exports: [TenantService],
})
export class TenantModule {}
