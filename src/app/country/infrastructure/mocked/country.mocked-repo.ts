import { Injectable } from "@nestjs/common";
import { MockedRepository } from "../../../shared/abstract-repository/mocked-repository";
import { CountryMockedEntity } from "./country.mocked-entity";
import { Country } from "../../domain/country.interface";

@Injectable()
export class CountryMockedRepository extends MockedRepository<
  CountryMockedEntity,
  Country
> {
  domainToEntity(d: Country): CountryMockedEntity {
    const entity = new CountryMockedEntity();
    entity.code = d.code;
    entity.name = d.name;
    entity.continent = d.continent;
    return entity;
  }

  entityToDomain(e: CountryMockedEntity): Country {
    return {
      id: e._id,
      code: e.code,
      name: e.name,
      continent: e.continent,
    };
  }

  async getCountryByName(name: string): Promise<Country> {
    const { data: countries } = await this.findAll({});
    if (countries.length === 0) return null;
    const filtered = countries.filter((s) => s.name === name);
    return filtered.length > 0 ? filtered.shift() : null;
  }

  async getCountryByCode(code: string): Promise<Country> {
    const { data: countries } = await this.findAll({});
    if (countries.length === 0) return null;
    const filtered = countries.filter((s) => s.code === code);
    return filtered.length > 0 ? filtered.shift() : null;
  }
}
