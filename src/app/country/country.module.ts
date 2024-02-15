import { Module } from "@nestjs/common";
import { getCountryRepo } from "./infrastructure/country.repo-provider";
import { AddCountryController } from "./application/add-country/add-country.controller";
import { AddCountryUseCase } from "./application/add-country/add-country.usecase";
import { CountryService } from "./domain/country.service";
import { SearchCountryController } from "./application/search-country/search-country.controller";
import { SearchCountryUseCase } from "./application/search-country/search-country.usecase";
import { RemoveCountryController } from "./application/remove-country/remove-country.controller";
import { RemoveCountryUseCase } from "./application/remove-country/remove-country.usecase";
import { UpdateCountryController } from "./application/update-country/update-country.controller";
import { UpdateCountryUseCse } from "./application/update-country/update-country.usecase";

@Module({
  imports: [],
  controllers: [
    AddCountryController,
    SearchCountryController,
    RemoveCountryController,
    UpdateCountryController,
  ],
  providers: [
    AddCountryUseCase,
    SearchCountryUseCase,
    RemoveCountryUseCase,
    UpdateCountryUseCse,
    CountryService,
    getCountryRepo(),
  ],
  exports: [CountryService],
})
export class CountryModule {}
