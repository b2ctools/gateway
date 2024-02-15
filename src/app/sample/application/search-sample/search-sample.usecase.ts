import { Inject, Injectable } from "@nestjs/common";
import { SampleService } from "../../domain/sample.service";
import { SearchRequest } from "../../../shared/base.request";

@Injectable()
export class SearchSampleUseCase {
  constructor(
    @Inject(SampleService)
    private readonly sampleService: SampleService,
  ) {}

  async execute(request: SearchRequest) {
    return await this.sampleService.findAllSamples(request);
  }
}
