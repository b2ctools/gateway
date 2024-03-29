import { Module } from "@nestjs/common";
import { getSampleRepo } from "./infrastructure/sample.repo-provider";
import { AddSampleController } from "./application/add-sample/add-sample.controller";
import { AddSampleUseCase } from "./application/add-sample/add-sample.usecase";
import { SampleService } from "./domain/sample.service";
import { SearchSampleController } from "./application/search-sample/search-sample.controller";
import { SearchSampleUseCase } from "./application/search-sample/search-sample.usecase";
import { RemoveSampleController } from "./application/remove-sample/remove-sample.controller";
import { RemoveSampleUseCase } from "./application/remove-sample/remove-sample.usecase";
import { UpdateSampleController } from "./application/update-sample/update-sample.controller";
import { UpdateSampleUseCse } from "./application/update-sample/update-sample.usecase";
import { CategoryModule } from "../category/category.module";
import { StoreModule } from "../store/store.module";
import { BrandModule } from "../brand/brand.module";
import { CountryModule } from "../country/country.module";
import { FindOneSampleController } from "./application/find-one-sample/find-one-sample.controller";
import { FindOneSampleUseCase } from "./application/find-one-sample/find-one-sample.usecase";
import { TenantModule } from "../tenant/tenant.module";

@Module({
  imports: [
    CategoryModule,
    StoreModule,
    BrandModule,
    CountryModule,
    TenantModule,
  ],
  controllers: [
    AddSampleController,
    SearchSampleController,
    RemoveSampleController,
    UpdateSampleController,
    FindOneSampleController,
  ],
  providers: [
    AddSampleUseCase,
    SearchSampleUseCase,
    RemoveSampleUseCase,
    UpdateSampleUseCse,
    SampleService,
    getSampleRepo(),
    FindOneSampleUseCase,
  ],
  exports: [SampleService],
})
export class SampleModule {}
