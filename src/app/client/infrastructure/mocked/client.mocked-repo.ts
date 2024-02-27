import { Injectable } from "@nestjs/common";
import { MockedRepository } from "../../../shared/abstract-repository/mocked-repository";
import { ClientMockedEntity } from "./client.mocked-entity";
import { Client } from "../../domain/client.interface";
import { ID } from "../../../shared/abstract-repository/repository.interface";

@Injectable()
export class ClientMockedRepository extends MockedRepository<
  ClientMockedEntity,
  Client
> {
  domainToEntity(d: Client): ClientMockedEntity {
    const entity = new ClientMockedEntity();

    entity.userId = d.userId;
    entity.description = d.description;
    return entity;
  }

  entityToDomain(e: ClientMockedEntity): Client {
    return {
      id: e._id,
      userId: e.userId,
      description: e.description,
    };
  }

  async getClientByUserId(userId: ID): Promise<Client> {
    const { data: clients } = await this.findAll({});
    if (clients.length === 0) return null;
    const filtered = clients.filter((s) => s.userId === userId);
    return filtered.length > 0 ? filtered.shift() : null;
  }
}
