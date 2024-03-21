import { Inject, Injectable } from "@nestjs/common";
import { SampleService } from "../../domain/sample.service";
import {
  SearchOutput,
  SearchRequest,
  sanitazeSearchQueryParams,
} from "../../../shared/filters-and-request/base.request";
import {
  SampleDto,
  sampleToDto,
  sortable,
} from "../../domain/sample.interface";

@Injectable()
export class SearchSampleUseCase {
  constructor(
    @Inject(SampleService)
    private readonly sampleService: SampleService,
  ) {}

  async execute(request: SearchRequest): Promise<SearchOutput<SampleDto>> {
    const { count, data } = await this.sampleService.findAllSamples(
      sanitazeSearchQueryParams<SearchRequest>(request, sortable),
    );

    const items = data.map((s) => sampleToDto(s));
    return {
      count,
      data: items,
      sortable,
    };
  }
}
