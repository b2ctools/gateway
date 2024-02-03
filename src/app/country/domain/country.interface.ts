
import { IDomain } from '../../shared/abstract-repository/entities/domain';

export type Continent = 'Europe' | 'America' | 'Asia' | 'Africa';

export interface Country extends IDomain {
  code: string;
  name: string;
  continent?: Continent;
}

export interface CountryDto extends Country {}

export const countryToDto = (u: Country): CountryDto => ({ ...u });

export const sortable = [
  'code',
  'name',
  'continent',
]
