import { Body, Controller, Inject, Patch } from "@nestjs/common";
import { userPath } from "src/app/shared/routes";
import { UpdateUserUseCase } from "./update-user.usecase";
import { UpdateUserRequest } from "./update-user.request";

@Controller(userPath)
export class UpdateUserController {
  constructor(
    @Inject(UpdateUserUseCase)
    private readonly useCase: UpdateUserUseCase,
  ) {}

  @Patch()
  async update(@Body() request: UpdateUserRequest) {
    return await this.useCase.execute(request);
  }
}
