import { Injectable } from '@nestjs/common';
import { MongoRepository } from '../../../shared/abstract-repository/mongo-repository';
import { StoreMongoEntity } from './store.mongo-entity';
import { Store } from '../../domain/store.interface';

@Injectable()
export class StoreMongoRepository extends MongoRepository<
  StoreMongoEntity,
  Store
> {
  domainToEntity(d: Store): StoreMongoEntity {
    console.log(d);
    throw new Error('Method not implemented.');
  }

  entityToDomain(e: StoreMongoEntity): Store {
    console.log(e);
    throw new Error('Method not implemented.');
  }

  async getStoreByName(name: string) {
    console.log(name);
    throw new Error('Method not implemented.');
  }
}
