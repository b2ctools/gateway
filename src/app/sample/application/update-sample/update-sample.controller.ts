import { Body, Controller, Inject, Param, Patch } from "@nestjs/common";
import { samplePath } from "../../../shared/routes";
import { SampleDto } from "../../domain/sample.interface";
import { UpdateSampleUseCse } from "./update-sample.usecase";
import { UpdateSampleRequest } from "./update-sample.request";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

@Controller(samplePath)
export class UpdateSampleController {
  constructor(
    @Inject(UpdateSampleUseCse)
    private readonly useCase: UpdateSampleUseCse,
  ) {}

  @Patch(":id")
  async updateSample(
    @Param("id") id: ID,
    @Body() request: UpdateSampleRequest,
  ): Promise<SampleDto> {
    return await this.useCase.execute(id, request);
  }
}
