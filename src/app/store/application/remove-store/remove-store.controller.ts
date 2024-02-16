import { Controller, Delete, Inject, Param } from "@nestjs/common";
import { storePath } from "../../../shared/routes";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import { RemoveStoreUseCase } from "./remove-store.usecase";

@Controller(storePath)
export class RemoveStoreController {
  constructor(
    @Inject(RemoveStoreUseCase)
    private readonly useCase: RemoveStoreUseCase,
  ) {}

  @Delete("/:id")
  async RemoveStore(@Param("id") id: ID) {
    await this.useCase.execute(id);
    return { message: "Store succesfully removed" };
  }
}
