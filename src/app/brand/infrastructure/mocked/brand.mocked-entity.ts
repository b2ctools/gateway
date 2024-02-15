import { MockedEntity } from "../../../shared/abstract-repository/entities/mocked-entity";
import { Brand } from "../../domain/brand.interface";

export class BrandMockedEntity
  extends MockedEntity
  implements Omit<Brand, "id">
{
  name: string;
  description?: string;
}
