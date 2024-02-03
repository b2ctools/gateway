import { Body, Controller, Inject, Patch } from "@nestjs/common";
import { countryPath } from "../../../shared/routes";
import { countryToDto } from "../../domain/country.interface";
import { UpdateCountryUseCse } from "./update-country.usecase";
import { UpdateCountryRequest } from "./update-country.request";
import { UpdateCountryCommand } from "./update-country.command";

@Controller(countryPath)
export class UpdateCountryController {
    constructor(
        @Inject(UpdateCountryUseCse)
        private readonly useCase: UpdateCountryUseCse,
    ){}

    @Patch()
    async UpdateCountry(@Body() request: UpdateCountryRequest){
        const pc = await this.useCase.execute(new UpdateCountryCommand(request))
        return countryToDto(pc);
    }
}