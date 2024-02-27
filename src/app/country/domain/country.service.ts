import { BadRequestException, Inject, Injectable } from "@nestjs/common";

import { AddCountryCommand } from "../application/add-country/add-country.command";
import { Continent, Country } from "./country.interface";
import {
  FindAllOutput,
  ID,
} from "../../shared/abstract-repository/repository.interface";
import { CountryRepository } from "../infrastructure/country-repositor.type";
import { SearchRequest } from "../../shared/base.request";

@Injectable()
export class CountryService {
  constructor(
    @Inject("CountryRepository")
    private readonly countryRepo: CountryRepository,
  ) {}

  private async verifyCountryName(name: string): Promise<void> {
    const existing = await this.countryRepo.getCountryByName(name);

    if (existing) {
      throw new BadRequestException(`country name  is already taken`);
    }
  }

  private async verifyCountryCode(code: string): Promise<void> {
    const existing = await this.countryRepo.getCountryByCode(code);

    if (existing) {
      throw new BadRequestException(`country code  is already taken`);
    }
  }

  async findByIdOrFail(countryId: ID) {
    const existingCountry = await this.countryRepo.findById(countryId);
    if (!existingCountry) {
      throw new BadRequestException(`Country with id ${countryId} not found`);
    }
    return existingCountry;
  }

  async addCountry(command: AddCountryCommand): Promise<Country> {
    await this.verifyCountryName(command.name);
    await this.verifyCountryCode(command.code);

    const country: Country = {
      id: null,
      tenantId: null,
      ...command,
    };

    return await this.countryRepo.create(country);
  }

  async removeCountry(id: ID) {
    await this.countryRepo.delete(id);
  }

  async findAllCountries(
    request: SearchRequest,
  ): Promise<FindAllOutput<Country>> {
    this.countryRepo.logItems();
    return await this.countryRepo.findAll(request);
  }

  async updateCountry({
    id,
    code,
    name,
    continent,
  }: {
    id: ID;
    code?: string;
    name?: string;
    continent?: Continent;
  }): Promise<Country> {
    const existingCountry = await this.findByIdOrFail(id);
    if (name) {
      await this.canUpdateName(name, existingCountry.id);
    }
    existingCountry.code = code ? code : existingCountry.code;
    existingCountry.name = name ? name : existingCountry.name;
    existingCountry.continent = continent
      ? continent
      : existingCountry.continent;

    console.log(
      `Updating Country - ${JSON.stringify({
        id,
        code,
        name,
        continent,
      })}`,
    );
    return await this.countryRepo.persist(existingCountry);
  }

  private async canUpdateName(name: string, existingId: ID) {
    const country = await this.countryRepo.getCountryByName(name);
    if (country && country.id !== existingId) {
      throw new BadRequestException(`Country name ${name} is already taken`);
    }
  }
}
