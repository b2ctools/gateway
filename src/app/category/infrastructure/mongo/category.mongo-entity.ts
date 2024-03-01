import { MongoEntity } from "../../../shared/abstract-repository/entities/mongo-entity";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import {
  CategoryStatus,
  Category,
} from "../../domain/category.interface";

export class CategoryMongoEntity
  extends MongoEntity
  implements Omit<Category, "id">
{
  name: string;
  description?: string;
  parent: ID;
  status: CategoryStatus;
}
