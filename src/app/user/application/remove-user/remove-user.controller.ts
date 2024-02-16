import { Controller, Delete, Inject, Param } from "@nestjs/common";
import { userPath } from "../../../shared/routes";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import { RemoveSampleUseCase } from "./remove-user.usecase";

@Controller(userPath)
export class RemoveUserController {
  constructor(
    @Inject(RemoveSampleUseCase)
    private readonly useCase: RemoveSampleUseCase,
  ) {}

  @Delete("/:id")
  async removeUser(@Param("id") id: ID) {
    await this.useCase.execute(id);
    return { message: "User succesfully removed" };
  }
}
