
import { Injectable } from '@nestjs/common';
import { MongoRepository } from '../../../shared/abstract-repository/mongo-repository';
import { SubscriptionMongoEntity } from './subscription.mongo-entity';
import { Subscription } from '../../domain/subscription.interface';

@Injectable()
export class SubscriptionMongoRepository extends MongoRepository<
  SubscriptionMongoEntity,
  Subscription
> {
  domainToEntity(d: Subscription): SubscriptionMongoEntity {
    console.log(d);
    throw new Error('Method not implemented.');
  }
  entityToDomain(e: SubscriptionMongoEntity): Subscription {
    console.log(e);
    throw new Error('Method not implemented.');
  }

  // async getSubscriptionByName(name: string): Promise<Subscription> {
  //   console.log(name);
  //   throw new Error('Method not implemented.');
  // }

}
