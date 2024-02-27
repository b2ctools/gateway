import { MockedEntity } from "../../../shared/abstract-repository/entities/mocked-entity";
import { Resource } from "../../domain/resource.interface";

export class ResourceMockedEntity
  extends MockedEntity
  implements Omit<Resource, "id">
{
  name: string;
  description?: string;
}
