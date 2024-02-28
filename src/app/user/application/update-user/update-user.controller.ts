import { Body, Controller, Inject, Param, Patch } from "@nestjs/common";
import { userPath } from "../../../shared/routes";
import { UpdateUserUseCase } from "./update-user.usecase";
import { UpdateUserRequest } from "./update-user.request";
import { UserDto } from "../../domain/user.interface";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

@Controller(userPath)
export class UpdateUserController {
  constructor(
    @Inject(UpdateUserUseCase)
    private readonly useCase: UpdateUserUseCase,
  ) {}

  @Patch(":id")
  async update(
    @Param("id") id: ID,
    @Body() request: UpdateUserRequest,
  ): Promise<UserDto> {
    return await this.useCase.execute(id, request);
  }
}
