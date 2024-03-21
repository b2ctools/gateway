import { Inject, Injectable } from "@nestjs/common";
import { CountryService } from "../../domain/country.service";
import {
  SearchRequest,
  sanitazeSearchQueryParams,
} from "../../../shared/filters-and-request/base.request";
import { sortable } from "../../domain/country.interface";

@Injectable()
export class SearchCountryUseCase {
  constructor(
    @Inject(CountryService)
    private readonly countryService: CountryService,
  ) {}

  async execute(request: SearchRequest) {
    return await this.countryService.findAllCountries(
      sanitazeSearchQueryParams<SearchRequest>(request, sortable),
    );
  }
}
