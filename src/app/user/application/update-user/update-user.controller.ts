import { Body, Controller, Inject, Patch } from "@nestjs/common";
import { userPath } from "../../../shared/routes";
import { UpdateUserUseCase } from "./update-user.usecase";
import { UpdateUserRequest } from "./update-user.request";
import { UserDto } from "../../domain/user.interface";

@Controller(userPath)
export class UpdateUserController {
  constructor(
    @Inject(UpdateUserUseCase)
    private readonly useCase: UpdateUserUseCase,
  ) {}

  @Patch()
  async update(@Body() request: UpdateUserRequest): Promise<UserDto> {
    return await this.useCase.execute(request);
    
  }
}
