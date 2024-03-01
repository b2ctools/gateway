import { Controller, Get, Inject } from "@nestjs/common";
import { userPath } from "src/app/shared/routes";
import { GetAccountUseCase } from "./get-accounts.usecase";
import { AccountDto } from "src/app/account/domain/account.interface";

@Controller(userPath)
export class GetAccountsController {
  constructor(
    @Inject(GetAccountUseCase)
    private readonly getAccountUseCase: GetAccountUseCase,
  ) {}

  @Get("/accounts")
  async getAccounts(): Promise<AccountDto[]> {
    return await this.getAccountUseCase.execute();
  }
}
