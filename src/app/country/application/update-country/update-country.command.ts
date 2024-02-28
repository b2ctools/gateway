import { Injectable } from "@nestjs/common";
import { Continent } from "../../domain/country.interface";
import { UpdateCountryRequest } from "./update-country.request";

@Injectable()
export class UpdateCountryCommand {
  code: string;
  name: string;
  continent: Continent;
  constructor(request: UpdateCountryRequest) {
    const { code, name, continent } = request;
    this.code = code;
    this.name = name;
    this.continent = continent;
  }
}
