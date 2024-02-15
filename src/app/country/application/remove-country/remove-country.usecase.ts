import { Inject, Injectable } from "@nestjs/common";
import { CountryService } from "../../domain/country.service";
import { ID } from "../../../shared/abstract-repository/repository.interface";

@Injectable()
export class RemoveCountryUseCase {
  constructor(
    @Inject(CountryService)
    private readonly countryService: CountryService,
  ) {}

  async execute(countryId: ID) {
    await this.countryService.removeCountry(countryId);
  }
}
