import { MockedEntity } from '../../../shared/abstract-repository/entities/mocked-entity';
import { Continent, Country } from '../../domain/country.interface';

export class CountryMockedEntity
  extends MockedEntity
  implements Omit<Country, 'id'>
{
  code: string;
  name: string;
  continent?: Continent;
}
