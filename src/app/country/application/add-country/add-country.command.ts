import { Continent, Country } from "../../domain/country.interface";
import { AddCountryRequest } from "./add-country.request";

export class AddCountryCommand implements Omit<Country, "id" | "tenantId"> {
  code: string;
  name: string;
  continent?: Continent;

  constructor(request: AddCountryRequest) {
    const { name, code, continent } = request;
    this.code = code;
    this.name = name;
    this.continent = continent;
  }
}
