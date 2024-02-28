import { MockedEntity } from "../../../shared/abstract-repository/entities/mocked-entity";
import { Permission } from "../../domain/permission.interface";

export class PermissionMockedEntity
  extends MockedEntity
  implements Omit<Permission, "id">
{
  name: string;
  description?: string;
}
