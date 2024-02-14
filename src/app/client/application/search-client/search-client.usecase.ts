
import { Inject, Injectable } from "@nestjs/common";
import { ClientService } from "../../domain/client.service";
import { SearchRequest } from "../../../shared/base.request";

@Injectable()
export class SearchClientUseCase {
    constructor(
        @Inject(ClientService)
        private readonly clientService: ClientService,
    ){}

    async execute(request: SearchRequest){
        return await this.clientService.findAllClients(request)
    }
}
