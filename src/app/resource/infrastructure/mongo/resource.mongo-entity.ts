import { MongoEntity } from "../../../shared/abstract-repository/entities/mongo-entity";
import { Resource } from "../../domain/resource.interface";

export class ResourceMongoEntity
  extends MongoEntity
  implements Omit<Resource, "id">
{
  name: string;
  description?: string;
}
