import { Inject, Injectable } from "@nestjs/common";
import { ClientService } from "../../domain/client.service";
import {
  SearchRequest,
  sanitazeSearchQueryParams,
} from "../../../shared/base.request";
import { sortable } from "../../domain/client.interface";

@Injectable()
export class SearchClientUseCase {
  constructor(
    @Inject(ClientService)
    private readonly clientService: ClientService,
  ) {}

  async execute(request: SearchRequest) {
    return await this.clientService.findAllClients(
      sanitazeSearchQueryParams<SearchRequest>(request, sortable),
    );
  }
}
