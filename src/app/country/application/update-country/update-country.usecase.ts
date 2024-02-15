import { Inject, Injectable } from "@nestjs/common";
import { CountryService } from "../../domain/country.service";
import { UpdateCountryCommand } from "./update-country.command";

@Injectable()
export class UpdateCountryUseCse {
  constructor(
    @Inject(CountryService)
    private readonly countryService: CountryService,
  ) {}

  async execute(request: UpdateCountryCommand) {
    return await this.countryService.updateCountry(request);
  }
}
