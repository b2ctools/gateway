import { Inject, Injectable } from "@nestjs/common";
import { SampleService } from "../../domain/sample.service";
import {
  SearchRequest,
  sanitazeSearchQueryParams,
} from "../../../shared/base.request";
import { sortable } from "../../domain/sample.interface";

@Injectable()
export class SearchSampleUseCase {
  constructor(
    @Inject(SampleService)
    private readonly sampleService: SampleService,
  ) {}

  async execute(request: SearchRequest) {
    return await this.sampleService.findAllSamples(
      sanitazeSearchQueryParams<SearchRequest>(request, sortable),
    );
  }
}
