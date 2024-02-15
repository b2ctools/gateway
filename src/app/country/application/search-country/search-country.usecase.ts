import { Inject, Injectable } from "@nestjs/common";
import { CountryService } from "../../domain/country.service";
import { SearchRequest } from "../../../shared/base.request";

@Injectable()
export class SearchCountryUseCase {
  constructor(
    @Inject(CountryService)
    private readonly countryService: CountryService,
  ) {}

  async execute(request: SearchRequest) {
    return await this.countryService.findAllCountries(request);
  }
}
