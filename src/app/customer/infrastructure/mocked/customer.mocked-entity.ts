import { ID } from "../../../shared/abstract-repository/repository.interface";
import { MockedEntity } from "../../../shared/abstract-repository/entities/mocked-entity";
import { Customer } from "../../domain/customer.interface";

export class CustomerMockedEntity
  extends MockedEntity
  implements Omit<Customer, "id">
{
  userId: ID;
  description?: string;
}
