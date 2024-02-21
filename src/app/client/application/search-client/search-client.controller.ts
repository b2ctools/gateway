import { Controller, Get, Inject, Query } from "@nestjs/common";
import { SearchClientUseCase } from "./search-client.usecase";
import {
  ClientDto,
  sortable,
  clientToDto,
} from "../../domain/client.interface";
import { clientPath } from "../../../shared/routes";
import { SearchOutput, SearchRequest } from "../../../shared/base.request";

@Controller(clientPath)
export class SearchClientController {
  constructor(
    @Inject(SearchClientUseCase)
    private readonly useCase: SearchClientUseCase,
  ) {}

  @Get()
  async findAllClients(
    @Query() request: SearchRequest,
  ): Promise<SearchOutput<ClientDto>> {
    const { count, data } = await this.useCase.execute(request)
    const items = data.map((s) =>
      clientToDto(s),
    );
    return {
      count,
      data: items,
      sortable,
    };
  }
}
