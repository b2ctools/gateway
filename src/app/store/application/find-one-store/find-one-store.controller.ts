import { Controller, Get, Inject, Param } from "@nestjs/common";
import { storePath } from "../../../shared/routes";
import { FindOneStoreUseCase } from "./find-one-store.usecase";
import { ID } from "../../../shared/abstract-repository/repository.interface";

@Controller(storePath)
export class FindOneStoreController {
  constructor(
    @Inject(FindOneStoreUseCase)
    private readonly useCase: FindOneStoreUseCase,
  ) {}

  @Get(":id")
  async findOneStore(@Param("id") id: ID) {
    return await this.useCase.execute(id);
  }
}
