import { Inject, Injectable } from "@nestjs/common";
import { CountryService } from "../../domain/country.service";
import { ID } from "../../../shared/abstract-repository/repository.interface";

@Injectable()
export class FindOneCountryUseCase {
  constructor(
    @Inject(CountryService)
    private readonly countryService: CountryService,
  ) {}

  async execute(id: ID) {
    return await this.countryService.findByIdOrFail(id);
  }
}
