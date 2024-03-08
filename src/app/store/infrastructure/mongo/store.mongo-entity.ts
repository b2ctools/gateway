import { MongoEntity } from "../../../shared/abstract-repository/entities/mongo-entity";
import { Store } from "../../domain/store.interface";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

export class StoreMongoEntity extends MongoEntity implements Omit<Store, "id"> {
  name: string;
  description?: string;
  address: string;
  logo: string;
  managedBy: ID;
  tenantId: ID;
}
