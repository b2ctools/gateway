import { Body, Controller, Inject, Param, Patch } from "@nestjs/common";
import { countryPath } from "../../../shared/routes";
import { countryToDto } from "../../domain/country.interface";
import { UpdateCountryUseCse } from "./update-country.usecase";
import { UpdateCountryRequest } from "./update-country.request";
import { UpdateCountryCommand } from "./update-country.command";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

@Controller(countryPath)
export class UpdateCountryController {
  constructor(
    @Inject(UpdateCountryUseCse)
    private readonly useCase: UpdateCountryUseCse,
  ) {}

  @Patch(":id")
  async UpdateCountry(
    @Param("id") id: ID,
    @Body() request: UpdateCountryRequest,
  ) {
    const pc = await this.useCase.execute(
      id,
      new UpdateCountryCommand(request),
    );
    return countryToDto(pc);
  }
}
