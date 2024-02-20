import { Controller, Get, Inject, Param } from "@nestjs/common";
import { countryPath } from "src/app/shared/routes";
import { FindOneCountryUseCase } from "./find-one-country.usecase";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

@Controller(countryPath)
export class FindOneCountryController {
  constructor(
    @Inject(FindOneCountryUseCase)
    private readonly useCase: FindOneCountryUseCase
  ) {}

  @Get(':id')
  async findOneCountry(@Param("id") id: ID) {
    return await this.useCase.execute(id);
  }
}
