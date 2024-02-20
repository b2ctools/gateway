import { Module } from "@nestjs/common";
import { getBrandRepo } from "./infrastructure/brand.repo-provider";
import { AddBrandController } from "./application/add-brand/add-brand.controller";
import { AddBrandUseCase } from "./application/add-brand/add-brand.usecase";
import { BrandService } from "./domain/brand.service";
import { SearchStoreController } from "./application/search-brand/search-brand.controller";
import { SearchBrandUseCase } from "./application/search-brand/search-brand.usecase";
import { RemoveBrandController } from "./application/remove-brand/remove-brand.controller";
import { RemoveBrandUseCase } from "./application/remove-brand/remove-brand.usecase";
import { UpdateBrandController } from "./application/update-brand/update-brand.controller";
import { UpdateBrandUseCse } from "./application/update-brand/update-brand.usecase";
import { FindOneBrandController } from "./application/find-one-brand/find-one-brand.controller";
import { FindOneBrandUseCase } from "./application/find-one-brand/find-one-brand.usecase";

@Module({
  imports: [],
  controllers: [
    AddBrandController,
    SearchStoreController,
    RemoveBrandController,
    UpdateBrandController,
    FindOneBrandController,
  ],
  providers: [
    AddBrandUseCase,
    SearchBrandUseCase,
    RemoveBrandUseCase,
    UpdateBrandUseCse,
    BrandService,
    getBrandRepo(),
    FindOneBrandUseCase,
  ],
  exports: [BrandService],
})
export class BrandModule {}
