import { Inject, Injectable } from "@nestjs/common";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import { AccountService } from "../../domain/account.service";

@Injectable()
export class FindOneAccountUsecase {
  constructor(
    @Inject(AccountService)
    private readonly accountService: AccountService,
  ) {}

  async execute(id: ID) {
    return await this.accountService.findByIdOrFail(id);
  }
}
