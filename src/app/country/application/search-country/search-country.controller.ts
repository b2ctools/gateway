import { Controller, Get, Inject, Query } from "@nestjs/common";

import {
  CountryDto,
  sortable,
  countryToDto,
} from "../../domain/country.interface";
import { countryPath } from "../../../shared/routes";
import { SearchOutput, SearchRequest } from "../../../shared/base.request";
import { SearchCountryUseCase } from "./search-country.usecase";
@Controller(countryPath)
export class SearchCountryController {
  constructor(
    @Inject(SearchCountryUseCase)
    private readonly useCase: SearchCountryUseCase,
  ) {}

  @Get()
  async findAllCountries(
    @Query() request: SearchRequest,
  ): Promise<SearchOutput<CountryDto>> {
    const { count, data } = await this.useCase.execute(request);
    const countries = data.map((b) => countryToDto(b));
    return {
      count,
      data: countries,
      sortable,
    };
  }
}
