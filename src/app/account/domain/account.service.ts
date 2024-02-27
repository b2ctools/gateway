import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { AccountRepository } from "../infrastructure/account-repository.type";
import { AddAccountCommand } from "../application/add-account/add-account.command";
import { Account } from "./account.interface";
import {
  FindAllOutput,
  ID,
} from "../../shared/abstract-repository/repository.interface";
import { SearchAccountRequest } from "../application/search-account/search-account.request";
import { ctxSrv } from "../../shared/context.service";
import { UserRole } from "../../user/domain/user.interface";

@Injectable()
export class AccountService {
  constructor(
    @Inject("AccountRepository")
    private readonly accountRepo: AccountRepository,
  ) {}

  private async verifyUserAccount(userId: ID): Promise<void> {
    const existing = await this.accountRepo.getAccountOfUser(userId);

    if (existing) {
      throw new BadRequestException(`Account of user ${userId} already exists`);
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
      permissions: [],
      ...command,
    };

    return await this.accountRepo.create(account);
  }

  async removeAccount(id: ID) {
    await this.accountRepo.delete(id);
  }

  async findAllAccounts(
    request: SearchAccountRequest,
  ): Promise<FindAllOutput<Account>> {
    ctxSrv.getUserRole() === UserRole.USER;

    const { userId: _userId, storeId } = request;
    const result = await this.accountRepo.findAll(request);
    const { count } = result;
    let { data: accounts } = result;

    // this is a restriction ... role user can only see his accounts
    const userId =
      ctxSrv.getUserRole() === UserRole.USER ? ctxSrv.getUserId() : _userId;

    accounts = userId ? accounts.filter((a) => a.userId === userId) : accounts;
    accounts = storeId
      ? accounts.filter((a) => a.storeId === storeId)
      : accounts;

    return {
      count,
      data: accounts,
    };
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
