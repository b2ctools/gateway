import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { MongoEntity } from "../../../shared/abstract-repository/entities/mongo-entity";
import { Resource, ResourseModuleType } from "../../domain/resource.interface";

export class ResourceMongoEntity
  extends MongoEntity
  implements Omit<Resource, "id">
{
  name: string;
  description?: string;
  module: ResourseModuleType;
  permissions: ID[];
}
