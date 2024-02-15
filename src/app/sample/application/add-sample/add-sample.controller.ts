import { Body, Controller, Inject, Post } from "@nestjs/common";
import { samplePath } from "../../../shared/routes";
import { AddSampleUseCase } from "./add-sample.usecase";
import { AddSampleRequest } from "./add-sample.request";
import { AddSampleCommand } from "./add-sample.command";
import { sampleToDto } from "../../domain/sample.interface";

@Controller(samplePath)
export class AddSampleController {
  constructor(
    @Inject(AddSampleUseCase)
    private readonly useCase: AddSampleUseCase,
  ) {}

  @Post()
  async addSample(@Body() request: AddSampleRequest) {
    const pc = await this.useCase.addSample(new AddSampleCommand(request));
    return sampleToDto(pc);
  }
}
