
import { Injectable } from '@nestjs/common';
import { MongoRepository } from '../../../shared/abstract-repository/mongo-repository';
import { BrandMongoEntity } from './brand.mongo-entity';
import { Brand } from '../../domain/brand.interface';

@Injectable()
export class BrandMongoRepository extends MongoRepository<
  BrandMongoEntity,
  Brand
> {
  domainToEntity(d: Brand): BrandMongoEntity {
    console.log(d);
    throw new Error('Method not implemented.');
  }
  entityToDomain(e: BrandMongoEntity): Brand {
    console.log(e);
    throw new Error('Method not implemented.');
  }

  async getBrandByName(name: string): Promise<Brand> {
    console.log(name);
    throw new Error('Method not implemented.');
  }

}
