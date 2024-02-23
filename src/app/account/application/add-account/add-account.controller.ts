import { Body, Controller, Inject, Post, UseGuards } from "@nestjs/common";
import { accountPath } from "../../../shared/routes";
import { AddAccountUseCase } from "./add-account.usecase";
import { AddAccountRequest } from "./add-account.request";
import { AddAccountCommand } from "./add-account.command";
import { accountToDto } from "../../domain/account.interface";
import { RoleChecking } from "src/app/auth/domain/middleware/role.guard";
import { UserRole } from "src/app/user/domain/user.interface";
import { Roles } from "src/app/auth/domain/middleware/roles.decorator";

@Controller(accountPath)
export class AddAccountController {
  constructor(
    @Inject(AddAccountUseCase)
    private readonly useCase: AddAccountUseCase,
  ) {}

  @UseGuards(RoleChecking)
  @Roles([UserRole.ADMIN, UserRole.OWNER])
  @Post()
  async addAccount(@Body() request: AddAccountRequest) {
    const pc = await this.useCase.execute(new AddAccountCommand(request));
    return accountToDto(pc);
  }
}
