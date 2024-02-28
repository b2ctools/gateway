import { MongoEntity } from "../../../shared/abstract-repository/entities/mongo-entity";
import { Permission } from "../../domain/permission.interface";

export class PermissionMongoEntity
  extends MongoEntity
  implements Omit<Permission, "id">
{
  name: string;
  description?: string;
}
