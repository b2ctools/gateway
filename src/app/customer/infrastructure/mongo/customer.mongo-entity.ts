import { ID } from "../../../shared/abstract-repository/repository.interface";
import { MongoEntity } from "../../../shared/abstract-repository/entities/mongo-entity";
import { Customer } from "../../domain/customer.interface";

export class CustomerMongoEntity
  extends MongoEntity
  implements Omit<Customer, "id">
{
  userId: ID;
  description?: string;
}
