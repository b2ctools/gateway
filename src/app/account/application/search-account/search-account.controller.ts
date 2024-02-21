import { Controller, Get, Inject, Query } from "@nestjs/common";
import { SearchAccountUseCase } from "./search-account.usecase";
import {
  AccountDto,
  sortable,
  accountToDto,
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
    const { count, data } = await this.useCase.execute(request)
    const items = data.map((s) =>
      accountToDto(s),
    );
    return {
      count,
      data: items,
      sortable,
    };
  }
}
