import { Inject, Injectable } from "@nestjs/common";
import { CountryService } from "../../domain/country.service";
import { UpdateCountryCommand } from "./update-country.command";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

@Injectable()
export class UpdateCountryUseCse {
  constructor(
    @Inject(CountryService)
    private readonly countryService: CountryService,
  ) {}

  async execute(id: ID, request: UpdateCountryCommand) {
    return await this.countryService.updateCountry({ id, ...request });
  }
}
