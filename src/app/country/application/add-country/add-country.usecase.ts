
import { Inject, Injectable } from '@nestjs/common';
import { CountryService } from '../../domain/country.service';
import { AddCountryCommand } from './add-country.command';

@Injectable()
export class AddCountryUseCase {
  constructor(
    @Inject(CountryService)
    private readonly countryService: CountryService
  ) {}

  async addCountry(command: AddCountryCommand){
    return await this.countryService.addCountry(command);
  }

}
