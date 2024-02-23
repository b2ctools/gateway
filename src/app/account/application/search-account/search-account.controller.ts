import { Controller, Get, Inject, Query } from "@nestjs/common";
import { SearchAccountUseCase } from "./search-account.usecase";
import {
  AccountDto,
} from "../../domain/account.interface";
import { accountPath } from "../../../shared/routes";
import { SearchOutput } from "../../../shared/base.request";
import { SearchAccountRequest } from "./search-account.request";

@Controller(accountPath)
export class SearchAccountController {
  constructor(
    @Inject(SearchAccountUseCase)
    private readonly useCase: SearchAccountUseCase,
  ) {}

  @Get()
  async findAllAccounts(
    @Query() request: SearchAccountRequest,
  ): Promise<SearchOutput<AccountDto>> {
    return await this.useCase.execute(request);
  }
}
