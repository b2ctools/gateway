import { MongoEntity } from '../../../shared/abstract-repository/entities/mongo-entity';
import { Continent, Country } from '../../domain/country.interface';

export class CountryMongoEntity
  extends MongoEntity
  implements Omit<Country, 'id'>
{
  code: string;
  name: string;
  continent?: Continent;
}
