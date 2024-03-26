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
import { PlanModule } from "../plan/plan.module";
import { AccountModule } from "../account/account.module";
import { StoreModule } from "../store/store.module";
import { UserModule } from "../user/user.module";

@Module({
  imports: [PlanModule, forwardRef(() => AccountModule), forwardRef(() => StoreModule), forwardRef(() => UserModule)],
  controllers: [
    AddTenantController,
    SearchTenantController,
    RemoveTenantController,
    UpdateTenantController,
    FindOneTenantController,
  ],
  providers: [
    AddTenantUseCase,
    SearchTenantUseCase,
    RemoveTenantUseCase,
    UpdateTenantUseCse,
    TenantService,
    getTenantRepo(),
    FineOneTenantUseCase,
  ],
  exports: [TenantService],
})
export class TenantModule {}
