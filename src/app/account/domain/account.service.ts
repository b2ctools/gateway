import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from "@nestjs/common";
import { AccountRepository } from "../infrastructure/account-repository.type";
import { AddAccountCommand } from "../application/add-account/add-account.command";
import { Account } from "./account.interface";
import {
  FindAllOutput,
  ID,
} from "../../shared/abstract-repository/repository.interface";
import { SearchAccountRequest } from "../application/search-account/search-account.request";
import { StoreService } from "../../store/domain/store.service";
import { EqualFilter } from "../../shared/filters-and-request/request-filters";

@Injectable()
export class AccountService {
  constructor(
    @Inject("AccountRepository")
    private readonly accountRepo: AccountRepository,

    @Inject(forwardRef(() => StoreService))
    private readonly storeService: StoreService,
  ) {}

  private async verifyStoreAccount(
    userId: ID,
    storeId: ID,
    tenantId: ID,
  ): Promise<void> {
    // verifing existing store
    const store = await this.storeService.findByIdOrFail(storeId);

    // verifing existing account on store
    const accounts = await this.accountRepo.getAccountsFromUser(
      userId,
      tenantId,
    );
    const existing = accounts.find((a) => a.storeId == storeId);
    if (existing) {
      throw new BadRequestException(
        `Account of user ${userId} for store ${store.name} already exists`,
      );
    }
  }

  private async verifyTenantAccount(userId: ID, tenantId: ID): Promise<void> {
    // TODO: add tenant references in the validation look up
    // verifing existing account on tenant
    const accounts = await this.accountRepo.getAccountsFromUser(
      userId,
      tenantId,
    );
    const existing = accounts.find((a) => a.type === "tenant");
    if (existing) {
      throw new BadRequestException(
        `Account of user ${userId} in the tenant already exists`,
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

  async addAccount(command: AddAccountCommand): Promise<Account> {
    const { userId, storeId, tenantId } = command;

    storeId
      ? await this.verifyStoreAccount(userId, storeId, tenantId)
      : await this.verifyTenantAccount(userId, tenantId);

    const account: Account = {
      id: null,

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
    // ctxSrv.getUserRole() === UserRole.USER;

    // const { userId: _userId, storeId, tenantId } = request;
    return await this.accountRepo.findAll(request);
    // const { count } = result;
    // let { data: accounts } = result;

    // // accounts will always be filtered by tenantId
    // accounts = tenantId? accounts.filter((a) => a.tenantId === tenantId) : accounts;

    // // this is a restriction ... role user can only see his accounts
    // const userId =
    //   ctxSrv.getUserRole() === UserRole.USER ? ctxSrv.getUserId() : _userId;

    // accounts = userId ? accounts.filter((a) => a.userId === userId) : accounts;
    // accounts = storeId
    //   ? accounts.filter((a) => a.storeId === storeId)
    //   : accounts;

    // return {
    //   count,
    //   data: accounts,
    // };
  }

  async getAccountsFromStore(storeId: ID) {
    return await this.accountRepo.getAccountsFromStore(storeId);
  }

  async setPermissions(id: ID, permissions: ID[]) {
    const account = await this.findByIdOrFail(id);
    account.permissions = permissions;
    return await this.accountRepo.persist(account);
  }

  async getAccountsFromUserOnly(userId: ID): Promise<Account[]> {
    const { data: accounts } = await this.accountRepo.findAll({
      filters: [ new EqualFilter("userId", userId)],
    });
    return accounts;
  }

  async setActive(id: ID, active: boolean): Promise<Account> {
    const account = await this.findByIdOrFail(id);
    account.isActive = !!active;
    return await this.accountRepo.persist(account);
  }
}
