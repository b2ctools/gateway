import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { MockedEntity } from "../../../shared/abstract-repository/entities/mocked-entity";
import { Resource, ResourseModuleType } from "../../domain/resource.interface";

export class ResourceMockedEntity
  extends MockedEntity
  implements Omit<Resource, "id">
{
  name: string;
  description?: string;
  module: ResourseModuleType;
  permissions: ID[];
}
