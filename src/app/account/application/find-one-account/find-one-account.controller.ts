import { Controller, Get, Inject, Param } from "@nestjs/common";
import { accountPath } from "../../../shared/routes";
import { FindOneAccountUsecase } from "./find-one-account.usecase";
import { AccountDto } from "../../domain/account.interface";
import { ID } from "../../../shared/abstract-repository/repository.interface";

@Controller(accountPath)
export class FindOneAccountController {
  constructor(
    @Inject(FindOneAccountUsecase)
    private readonly useCase: FindOneAccountUsecase,
  ) {}

  @Get(":id")
  async findOne(@Param("id") id: ID): Promise<AccountDto> {
    return await this.useCase.execute(id);
  }
}
