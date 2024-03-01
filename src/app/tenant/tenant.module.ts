import { Module, forwardRef } from "@nestjs/common";
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
import { FineOneTenantUseCase } from "./application/find-one-tenant/find-one-tenant.usecase";
import { FindOneTenantController } from "./application/find-one-tenant/find-one-tenant.controller";
import { SetPlanController } from "./application/set-plan/set-plan.controller";
import { SetPlanUseCase } from "./application/set-plan/set-plan.usecase";
import { PlanModule } from "../plan/plan.module";
import { AccountModule } from "../account/account.module";

@Module({
  imports: [PlanModule, forwardRef(() => AccountModule)],
  controllers: [
    AddTenantController,
    SearchTenantController,
    RemoveTenantController,
    UpdateTenantController,
    FindOneTenantController,
    SetPlanController,
  ],
  providers: [
    AddTenantUseCase,
    SearchTenantUseCase,
    RemoveTenantUseCase,
    UpdateTenantUseCse,
    TenantService,
    getTenantRepo(),
    FineOneTenantUseCase,
    SetPlanUseCase,
  ],
  exports: [TenantService],
})
export class TenantModule {}
