import { Controller, Get, Inject } from "@nestjs/common";
import { userPath } from "src/app/shared/routes";
import { UserService } from "../../domain/user.service";
import { userToDto } from "../../domain/user.interface";

@Controller(userPath)
export class MeController {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  @Get("/me")
  async me() {
    const user = await this.userService.me();
    return userToDto(user);
  }
}
