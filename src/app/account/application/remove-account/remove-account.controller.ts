import { Controller, Delete, Inject, Param } from "@nestjs/common";
import { accountPath } from "../../../shared/routes";
import { RemoveAccountUseCase } from "./remove-account.usecase";
import { ID } from "../../../shared/abstract-repository/repository.interface";

@Controller(accountPath)
export class RemoveAccountController {
  constructor(
    @Inject(RemoveAccountUseCase)
    private readonly useCase: RemoveAccountUseCase,
  ) {}

  @Delete("/:id")
  async removeAccount(@Param("id") id: ID) {
    await this.useCase.execute(id);
    return { message: "Account succesfully removed" };
  }
}
