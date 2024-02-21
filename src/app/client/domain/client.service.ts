import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { ClientRepository } from "../infrastructure/client-repository.type";
import { AddClientCommand } from "../application/add-client/add-client.command";
import { Client } from "./client.interface";
import { FindAllOutput, ID } from "../../shared/abstract-repository/repository.interface";
import { SearchRequest } from "../../shared/base.request";
import { UpdateClientRequest } from "../application/update-client/update-client.request";
import { UserService } from "../../user/domain/user.service";
import { UserRole } from "../../user/domain/user.interface";

@Injectable()
export class ClientService {
  constructor(
    @Inject("ClientRepository")
    private readonly clientRepo: ClientRepository,

    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  private async verifyExistingClient(userId: ID): Promise<void> {
    const existing = await this.clientRepo.getClientByUserId(userId);

    if (existing) {
      throw new BadRequestException(`Client name  is already taken`);
    }

    // verifying client role
    const { role } = await this.userService.findByIdOrFail(userId);
    if (role != UserRole.CLIENT) {
      throw new BadRequestException(
        `Registered userid ${userId} is not a client [${role}]`,
      );
    }
  }

  async findByIdOrFail(clientId: ID) {
    const existingClient = await this.clientRepo.findById(clientId);
    if (!existingClient) {
      throw new BadRequestException(`Client with id ${clientId} not found`);
    }
    return existingClient;
  }

  async addClient(command: AddClientCommand) {
    await this.verifyExistingClient(command.userId);

    const client: Client = {
      id: null,
      tenantId: null,
      ...command,
    };

    return await this.clientRepo.create(client);
  }

  async removeClient(id: ID) {
    const client = await this.findByIdOrFail(id);
    const user = await this.userService.findByIdOrFail(client.userId);
    await this.clientRepo.delete(id);
    await this.userService.removeUser_id(user.id);
  }

  async findAllClients(request: SearchRequest): Promise<FindAllOutput<Client>> {
    return await this.clientRepo.findAll(request);
  }

  async updateClient(request: UpdateClientRequest): Promise<Client> {
    const { id, description } = request;
    const existingClient = await this.findByIdOrFail(id);

    existingClient.description = description
      ? description
      : existingClient.description;

    console.log(
      `Updating Client - ${JSON.stringify({
        id,
        description,
      })}`,
    );
    return await this.clientRepo.persist(existingClient);
  }
}
