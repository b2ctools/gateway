import { Body, Controller, Inject, Param, Patch } from "@nestjs/common";
import { resourcePath } from "../../../shared/routes";
import { resourceToDto } from "../../domain/resource.interface";
import { UpdateResourceUseCse } from "./update-resource.usecase";
import { UpdateResourceRequest } from "./update-resource.request";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

@Controller(resourcePath)
export class UpdateResourceController {
  constructor(
    @Inject(UpdateResourceUseCse)
    private readonly useCase: UpdateResourceUseCse,
  ) {}

  @Patch(":id")
  async updateResource(
    @Param("id") id: ID,
    @Body() request: UpdateResourceRequest,
  ) {
    const pc = await this.useCase.execute(id, request);
    return resourceToDto(pc);
  }
}
