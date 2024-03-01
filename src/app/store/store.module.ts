import { Module, forwardRef } from "@nestjs/common";
import { AddStoreController } from "./application/add-store/add-store.controller";
import { AddStoreUseCase } from "./application/add-store/add-store.usecase";
import { StoreService } from "./domain/store.service";
import { getStoreRepo } from "./infrastructure/store.repo-provider";
import { SearchStoreUseCase } from "./application/search-store/search-store.usecase";
import { SearchStoreController } from "./application/search-store/search-store.controller";
import { AuthModule } from "../auth/auth.module";
import { RemoveStoreController } from "./application/remove-store/remove-store.controller";
import { RemoveStoreUseCase } from "./application/remove-store/remove-store.usecase";
import { UpdateStoreController } from "./application/update-store/update-store.controller";
import { UpdateStoreUseCase } from "./application/update-store/update-store.usecase";
import { AccountModule } from "../account/account.module";
import { FindOneStoreController } from "./application/find-one-store/find-one-store.controller";
import { FindOneStoreUseCase } from "./application/find-one-store/find-one-store.usecase";
import { TenantModule } from "../tenant/tenant.module";

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => AccountModule),
    TenantModule,
  ],
  controllers: [
    AddStoreController,
    SearchStoreController,
    RemoveStoreController,
    UpdateStoreController,
    FindOneStoreController,
  ],
  providers: [
    AddStoreUseCase,
    SearchStoreUseCase,
    StoreService,
    getStoreRepo(),
    RemoveStoreUseCase,
    UpdateStoreUseCase,
    FindOneStoreUseCase,
  ],

  exports: [StoreService],
})
export class StoreModule {}
