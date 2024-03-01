import { Body, Controller, Inject, Param, Post } from "@nestjs/common";
import { accountPath } from "src/app/shared/routes";
import { SetActiveUseCase } from "./set-active.usecase";
import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { AccountDto } from "../../domain/account.interface";

@Controller(accountPath)
export class SetActiveController {
  constructor(
    @Inject(SetActiveUseCase)
    private readonly useCase: SetActiveUseCase,
  ) {}

  @Post("/set-active/:id")
  async setActive(
    @Param("id") id: ID,
    @Body("active") active: boolean,
  ): Promise<AccountDto> {
    return await this.useCase.execute(id, active);
  }
}
