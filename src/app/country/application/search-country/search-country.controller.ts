
import { Controller, Get, Inject, Query } from '@nestjs/common';

import { CountryDto, sortable, countryToDto } from '../../domain/country.interface';
import { countryPath } from '../../../shared/routes';
import { SearchOutput, SearchRequest } from '../../../shared/base.request';
import { SearchCountryUseCase } from './search-country.usecase';
@Controller(countryPath)
export class SearchCountryController {
  constructor(
    @Inject(SearchCountryUseCase)
    private readonly useCase: SearchCountryUseCase
  ) {}

  @Get()
  async findAllCountries(@Query() request: SearchRequest): Promise<SearchOutput<CountryDto>> {
    const countries = (await this.useCase.execute(request)).map((b) => countryToDto(b));
    return {
      count: countries.length,
      data: countries,
      sortable
    }
  }
}

