import { Inject, Injectable } from "@nestjs/common";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import { SampleService } from "../../domain/sample.service";

@Injectable()
export class FindOneSampleUseCase {
  constructor(
    @Inject(SampleService)
    private readonly sampleService: SampleService,
  ) {}
  async execute(id: ID) {
    return await this.sampleService.findByIdOrFail(id);
  }
}
