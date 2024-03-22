import { Inject, Injectable } from "@nestjs/common";
import { SampleService } from "../../domain/sample.service";
import { ID } from "../../../shared/abstract-repository/repository.interface";

@Injectable()
export class RemoveSampleUseCase {
  constructor(
    @Inject(SampleService)
    private readonly sampleService: SampleService,
  ) {}

  async execute(sampleId: ID) {
    await this.sampleService.findByIdOrFail(sampleId);
    await this.sampleService.removeSample(sampleId);
  }
}
