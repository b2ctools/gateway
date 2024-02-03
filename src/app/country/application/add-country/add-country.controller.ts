
import { Body, Controller, Inject, Post } from '@nestjs/common';

import { AddCountryUseCase } from './add-country.usecase';
import { AddCountryCommand } from './add-country.command';
import { countryToDto } from '../../domain/country.interface';
import { countryPath } from '../../../shared/routes';
import { AddCountryRequest } from './add-country.request';

@Controller(countryPath)
export class AddCountryController {
  constructor(
    @Inject(AddCountryUseCase)
    private readonly useCase: AddCountryUseCase
  ) {}

  @Post()
  async addCountry(@Body() request: AddCountryRequest) {
    
    const country = await this.useCase.addCountry(
      new AddCountryCommand(request)
    );
    return countryToDto(country);
  }
}
