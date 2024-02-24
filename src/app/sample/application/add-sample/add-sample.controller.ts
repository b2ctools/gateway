import { Body, Controller, Inject, Post } from "@nestjs/common";
import { samplePath } from "../../../shared/routes";
import { AddSampleUseCase } from "./add-sample.usecase";
import { AddSampleRequest } from "./add-sample.request";
import { AddSampleCommand } from "./add-sample.command";
import { SampleDto } from "../../domain/sample.interface";

@Controller(samplePath)
export class AddSampleController {
  constructor(
    @Inject(AddSampleUseCase)
    private readonly useCase: AddSampleUseCase,
  ) {}

  @Post()
  async addSample(@Body() request: AddSampleRequest): Promise<SampleDto> {
    return await this.useCase.addSample(new AddSampleCommand(request));
  }
}
