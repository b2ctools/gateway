import { Controller, Get, Inject, Param } from "@nestjs/common";
import { resourcePath } from "src/app/shared/routes";
import { FindOneResourceUseCase } from "./find-one-resource.usecase";
import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { ResourceDto } from "../../domain/resource.interface";

@Controller(resourcePath)
export class FindOneResourceController {
  constructor(
    @Inject(FindOneResourceUseCase)
    private readonly useCase: FindOneResourceUseCase,
  ) {}

  @Get(":id")
  async findOne(@Param("id") id: ID): Promise<ResourceDto> {
    return await this.useCase.execute(id);
  }
}
