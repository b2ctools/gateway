import { MongoEntity } from '../../../shared/abstract-repository/entities/mongo-entity';
import { Store } from '../../domain/store.interface';

export class StoreMongoEntity extends MongoEntity implements Omit<Store, 'id'> {
  name: string;
  description?: string;
}
