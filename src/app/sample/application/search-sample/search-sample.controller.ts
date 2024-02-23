import { Controller, Get, Inject, Query } from "@nestjs/common";
import { SearchSampleUseCase } from "./search-sample.usecase";
import {
  SampleDto,
  sortable,
  sampleToDto,
} from "../../domain/sample.interface";
import { samplePath } from "../../../shared/routes";
import { SearchOutput, SearchRequest } from "../../../shared/base.request";

@Controller(samplePath)
export class SearchSampleController {
  constructor(
    @Inject(SearchSampleUseCase)
    private readonly useCase: SearchSampleUseCase,
  ) {}

  @Get()
  async findAllSamples(
    @Query() request: SearchRequest,
  ): Promise<SearchOutput<SampleDto>> {
    const { count, data } = await this.useCase.execute(request);
    const items = data.map((s) => sampleToDto(s));
    return {
      count,
      data: items,
      sortable,
    };
  }
}
