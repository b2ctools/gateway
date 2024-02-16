import { Injectable } from "@nestjs/common";
import { MockedRepository } from "../../../shared/abstract-repository/mocked-repository";
import { AccountMockedEntity } from "./account.mocked-entity";
import { Account } from "../../domain/account.interface";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

@Injectable()
export class AccountMockedRepository extends MockedRepository<
  AccountMockedEntity,
  Account
> {
  domainToEntity(d: Account): AccountMockedEntity {
    const entity = new AccountMockedEntity();

    entity.permissions = d.permissions;
    entity.scope = d.scope;
    entity.userId = d.userId;
    entity.userId = d.storeId;
    entity.tenantId = d.tenantId;
    return entity;
  }

  entityToDomain(e: AccountMockedEntity): Account {
    return {
      id: e._id,
      userId: e.userId,
      storeId: e.storeId,
      permissions: e.permissions,
      scope: e.scope,
      tenantId: e.tenantId,
    };
  }

  async getAccountsFromStore(storeId: ID): Promise<Account[]> {
    const accounts = await this.findAll({});
    if (accounts.length === 0) return null;
    return accounts.filter((s) => s.storeId === storeId);
  }

  async getAccountOfUser(userId: ID): Promise<Account> {
    const accounts = await this.findAll({});
    if (accounts.length === 0) return null;
    const filtered = accounts.filter((s) => s.userId === userId);
    return filtered.length > 0 ? filtered.shift() : null;
  }
}
