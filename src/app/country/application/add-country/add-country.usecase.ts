import { Inject, Injectable } from "@nestjs/common";
import { CountryService } from "../../domain/country.service";
import { AddCountryCommand } from "./add-country.command";
import { CountryDto, countryToDto } from "../../domain/country.interface";

@Injectable()
export class AddCountryUseCase {
  constructor(
    @Inject(CountryService)
    private readonly countryService: CountryService,
  ) {}

  async addCountry(command: AddCountryCommand): Promise<CountryDto> {
    const country = await this.countryService.addCountry(command);
    return countryToDto(country);
  }
}
