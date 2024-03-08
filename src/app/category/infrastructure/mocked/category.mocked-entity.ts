import { MockedEntity } from "../../../shared/abstract-repository/entities/mocked-entity";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import {
  CategoryStatus,
  Category,
} from "../../domain/category.interface";

export class CategoryMockedEntity
  extends MockedEntity
  implements Omit<Category, "id">
{
  name: string;
  description?: string;
  parent: ID;
  status: CategoryStatus;
  tenantId: ID;
}
