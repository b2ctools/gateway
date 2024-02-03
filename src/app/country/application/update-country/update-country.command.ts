import { Injectable } from '@nestjs/common';
import { ID } from '../../../shared/abstract-repository/repository.interface';
import { Continent } from '../../domain/country.interface';
import { UpdateCountryRequest } from './update-country.request';

@Injectable()
export class UpdateCountryCommand {
  id: ID;
  code: string;
  name: string;
  continent: Continent;
  constructor(request: UpdateCountryRequest) {
    const { id, code, name, continent } = request;
    this.id = id;
    this.code = code;
    this.name = name;
    this.continent = continent;
  }
}
