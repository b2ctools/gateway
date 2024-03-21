import { Controller, Get, Inject, Query } from "@nestjs/common";
import { SearchResourceUseCase } from "./search-resource.usecase";
import {
  ResourceDto,
  sortable,
  resourceToDto,
} from "../../domain/resource.interface";
import { resourcePath } from "../../../shared/routes";
import { SearchOutput, SearchRequest } from "../../../shared/filters-and-request/base.request";

@Controller(resourcePath)
export class SearchResourceController {
  constructor(
    @Inject(SearchResourceUseCase)
    private readonly useCase: SearchResourceUseCase,
  ) {}

  @Get()
  async findAllResources(
    @Query() request: SearchRequest,
  ): Promise<SearchOutput<ResourceDto>> {
    const { data: resources } = await this.useCase.execute(request);
    const items = resources.map((s) => resourceToDto(s));
    return {
      count: items.length,
      data: items,
      sortable,
    };
  }
}
