
import { Inject, Injectable } from "@nestjs/common";
import { ClientService } from "../../domain/client.service";
import { ID } from "../../../shared/abstract-repository/repository.interface";

@Injectable()
export class RemoveClientUseCase {
    constructor(
        @Inject(ClientService)
        private readonly clientService: ClientService,
    ){}

    async execute(clientId: ID){
        await this.clientService.removeClient(clientId);
    }
}
