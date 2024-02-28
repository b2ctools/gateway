import { Inject, Injectable } from "@nestjs/common";
import { ClientService } from "../../domain/client.service";
import { UpdateClientRequest } from "./update-client.request";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

@Injectable()
export class UpdateClientUseCse {
  constructor(
    @Inject(ClientService)
    private readonly clientService: ClientService,
  ) {}

  async execute(id: ID, request: UpdateClientRequest) {
    return await this.clientService.updateClient(id, request);
  }
}
