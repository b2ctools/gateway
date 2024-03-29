import { userPath } from "../../../shared/routes";
import { RegisterUserUseCase } from "./register-user.usecase";
import { RegisterUserRequest } from "./register-user.request";
import { RegisterUserCommand } from "./register-user.command";
import { UserDto } from "../../domain/user.interface";
import { Body, Controller, Inject, Post } from "@nestjs/common";

@Controller(userPath)
export class RegisterUserController {
  constructor(
    @Inject(RegisterUserUseCase) private readonly useCase: RegisterUserUseCase,
  ) {}

  @Post("/register")
  async registerUser(@Body() request: RegisterUserRequest): Promise<UserDto> {
    return await this.useCase.execute(new RegisterUserCommand(request));
  }
}
