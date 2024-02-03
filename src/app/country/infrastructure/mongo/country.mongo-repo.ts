
import { Injectable } from '@nestjs/common';
import { MongoRepository } from '../../../shared/abstract-repository/mongo-repository';
import { CountryMongoEntity } from './country.mongo-entity';
import { Country } from '../../domain/country.interface';

@Injectable()
export class CountryMongoRepository extends MongoRepository<
  CountryMongoEntity,
  Country
> {
  domainToEntity(d: Country): CountryMongoEntity {
    console.log(d);
    throw new Error('Method not implemented.');
  }
  entityToDomain(e: CountryMongoEntity): Country {
    console.log(e);
    throw new Error('Method not implemented.');
  }

  async getCountryByName(name: string): Promise<Country> {
    console.log(name);
    throw new Error('Method not implemented.');
  }

  async getCountryByCode(code: string): Promise<Country> {
    console.log(code);
    throw new Error('Method not implemented.');
  }
  

}
