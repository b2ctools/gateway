import { Body, Controller, Inject, Post } from "@nestjs/common";
import { resourcePath } from "../../../shared/routes";
import { AddResourceUseCase } from "./add-resource.usecase";
import { AddResourceRequest } from "./add-resource.request";
import { AddResourceCommand } from "./add-resource.command";
import { Resource } from "../../domain/resource.interface";

@Controller(resourcePath)
export class AddResourceController {
  constructor(
    @Inject(AddResourceUseCase)
    private readonly useCase: AddResourceUseCase,
  ) {}

  @Post()
  async addResource(@Body() request: AddResourceRequest): Promise<Resource> {
    return await this.useCase.execute(new AddResourceCommand(request));
  }
}
