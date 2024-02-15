import { Module } from "@nestjs/common";
import { AddStoreController } from "./application/add-store/add-store.controller";
import { AddStoreUseCase } from "./application/add-store/add-store.usecase";
import { StoreService } from "./domain/store.service";
import { getStoreRepo } from "./infrastructure/store.repo-provider";
import { SearchStoreUseCase } from "./application/search-store/search-store.usecase";
import { SearchStoreController } from "./application/search-store/search-store.controller";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [AuthModule],
  controllers: [AddStoreController, SearchStoreController],
  providers: [
    AddStoreUseCase,
    SearchStoreUseCase,
    StoreService,
    getStoreRepo(),
  ],

  exports: [StoreService],
})
export class StoreModule {}
