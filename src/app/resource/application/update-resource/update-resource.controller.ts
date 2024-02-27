import { Body, Controller, Inject, Patch } from "@nestjs/common";
import { resourcePath } from "../../../shared/routes";
import { resourceToDto } from "../../domain/resource.interface";
import { UpdateResourceUseCse } from "./update-resource.usecase";
import { UpdateResourceRequest } from "./update-resource.request";

@Controller(resourcePath)
export class UpdateResourceController {
  constructor(
    @Inject(UpdateResourceUseCse)
    private readonly useCase: UpdateResourceUseCse,
  ) {}

  @Patch()
  async updateResource(@Body() request: UpdateResourceRequest) {
    const pc = await this.useCase.execute(request);
    return resourceToDto(pc);
  }
}
