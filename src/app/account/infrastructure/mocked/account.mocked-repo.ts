import { Injectable } from "@nestjs/common";
import { MockedRepository } from "../../../shared/abstract-repository/mocked-repository";
import { AccountMockedEntity } from "./account.mocked-entity";
import { Account } from "../../domain/account.interface";
import { ID } from "../../../shared/abstract-repository/repository.interface";

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
    entity.storeId = d.storeId;
    entity.type = d.type;
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
      type: e.type,
      tenantId: e.tenantId,
    };
  }

  async getAccountsFromStore(storeId: ID): Promise<Account[]> {
    const { data: accounts } = await this.findAll({});
    if (accounts.length === 0) return null;
    return accounts.filter((s) => s.storeId === storeId);
  }

  async getAccountsFromUser(userId: ID, tenantId: ID): Promise<Account[]> {
    const { data: accounts } = await this.findAll({});
    if (accounts.length === 0) return [];
    return accounts.filter((s) => s.userId === userId && s.tenantId === tenantId);
  }
}
