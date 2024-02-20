import { Controller, Get, Inject, Param } from "@nestjs/common";
import { samplePath } from "../../../shared/routes";
import { FindOneSampleUseCase } from "./find-one-sample.usecase";
import { ID } from "../../../shared/abstract-repository/repository.interface";

@Controller(samplePath)
export class FindOneSampleController {
  constructor(
    @Inject(FindOneSampleUseCase)
    private readonly useCase: FindOneSampleUseCase
  ) {}

  @Get(":id")
  async findOneSample(@Param("id") id: ID) {
    return await this.useCase.execute(id);
  }
}
