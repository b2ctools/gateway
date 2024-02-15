import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { MockedEntity } from "../../../shared/abstract-repository/entities/mocked-entity";
import { Client } from "../../domain/client.interface";

export class ClientMockedEntity
  extends MockedEntity
  implements Omit<Client, "id">
{
  userId: ID;
  description?: string;
}
