
import { Module } from '@nestjs/common';
import { getSampleRepo } from './infrastructure/sample.repo-provider';
import { AddSampleController } from './application/add-sample/add-sample.controller';
import { AddSampleUseCase } from './application/add-sample/add-sample.usecase';
import { SampleService } from './domain/sample.service';
import { SearchSampleController } from './application/search-sample/search-sample.controller';
import { SearchSampleUseCase } from './application/search-sample/search-sample.usecase';
import { RemoveSampleController } from './application/remove-sample/remove-sample.controller';
import { RemoveSampleUseCase } from './application/remove-sample/remove-sample.usecase';
import { UpdateSampleController } from './application/update-sample/update-sample.controller';
import { UpdateSampleUseCse } from './application/update-sample/update-sample.usecase';
import { ProductCategoryModule } from '../product-category/product-category.module';
import { StoreModule } from '../store/store.module';
import { BrandModule } from '../brand/brand.module';
import { CountryModule } from '../country/country.module';

@Module({
  imports: [ProductCategoryModule, StoreModule, BrandModule, CountryModule],
  controllers: [AddSampleController, SearchSampleController, RemoveSampleController, UpdateSampleController],
  providers: [AddSampleUseCase, SearchSampleUseCase, RemoveSampleUseCase, UpdateSampleUseCse, SampleService, getSampleRepo()],
  exports: [SampleService],
})
export class SampleModule {}
