import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { AccountRepository } from "../infrastructure/account-repository.type";
import { AddAccountCommand } from "../application/add-account/add-account.command";
import { Account } from "./account.interface";
import { ID } from "../../shared/abstract-repository/repository.interface";
import { SearchAccountRequest } from "../application/search-account/search-account.request";
import { ctxSrv } from "src/app/shared/context.service";

@Injectable()
export class AccountService {
  constructor(
    @Inject("AccountRepository")
    private readonly accountRepo: AccountRepository,
  ) {}

  private async verifyUserAccount(userId: ID): Promise<void> {
    const existing = await this.accountRepo.getAccountOfUser(userId);

    if (existing) {
      throw new BadRequestException(
        `Account of user ${userId} already exists`,
      );
    }
  }

  async findByIdOrFail(accountId: ID) {
    const existingAccount = await this.accountRepo.findById(accountId);
    if (!existingAccount) {
      throw new BadRequestException(`Account with id ${accountId} not found`);
    }
    return existingAccount;
  }

  async addAccount(command: AddAccountCommand) {
    await this.verifyUserAccount(command.userId);

    const account: Account = {
      id: null,
      tenantId: null,
      permissions: [],
      ...command,
    };

    return await this.accountRepo.create(account);
  }

  async removeAccount(id: ID) {
    await this.accountRepo.delete(id);
  }

  async findAllAccounts(request: SearchAccountRequest) {
    const { userId } = request;
    const accounts = await this.accountRepo.findAll(request);
    
    const userIdToFillter = userId ? userId : ctxSrv.getUserId();
    
    return accounts.filter((a) => a.userId === userIdToFillter);
  }

  async getAccountsFromStore(storeId: ID) {
    return await this.accountRepo.getAccountsFromStore(storeId);
  }

  async setPermissions(id: ID, permissions: ID[]) {
    const account = await this.findByIdOrFail(id);
    account.permissions = permissions;
    return await this.accountRepo.persist(account);
  }
}
