import { Body, Controller, Inject, Post, UseGuards } from "@nestjs/common";
import { accountPath } from "../../../shared/routes";
import { AddAccountUseCase } from "./add-account.usecase";
import { AddAccountRequest } from "./add-account.request";
import { AddAccountCommand } from "./add-account.command";
import { RoleChecking } from "src/app/auth/domain/middleware/role.guard";
import { UserRole } from "src/app/user/domain/user.interface";
import { Roles } from "src/app/auth/domain/middleware/roles.decorator";
import { AccountDto } from "../../domain/account.interface";

@Controller(accountPath)
export class AddAccountController {
  constructor(
    @Inject(AddAccountUseCase)
    private readonly useCase: AddAccountUseCase,
  ) {}

  @UseGuards(RoleChecking)
  @Roles([UserRole.ADMIN, UserRole.OWNER])
  @Post()
  async addAccount(@Body() request: AddAccountRequest): Promise<AccountDto> {
    return await this.useCase.execute(new AddAccountCommand(request));
  }
}
