import { Inject, Injectable } from "@nestjs/common";
import { AccountService } from "../../domain/account.service";
import { SearchAccountRequest } from "./search-account.request";
import { UserService } from "src/app/user/domain/user.service";
import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { StoreService } from "src/app/store/domain/store.service";
import { sortable } from "../../domain/account.interface";
import { sanitazeSearchQueryParams } from "src/app/shared/base.request";

@Injectable()
export class SearchAccountUseCase {
  constructor(
    @Inject(AccountService)
    private readonly accountService: AccountService,

    @Inject(UserService)
    private readonly userService: UserService,

    @Inject(StoreService)
    private readonly storeService: StoreService
  ) {}

  private async validateUser(userId: ID) {
    if (userId) {
      await this.userService.findByIdOrFail(userId);
      return;
    }
  }

  private async validateStore(storeId: ID) {
    if (storeId) {
      await this.storeService.findByIdOrFail(storeId);
      return;
    }
  }

  async execute(request: SearchAccountRequest) {
    const { userId, storeId } = request;
    await this.validateUser(userId);
    await this.validateStore(storeId);
    return await this.accountService.findAllAccounts(sanitazeSearchQueryParams<SearchAccountRequest>(request, sortable));
  }
}
