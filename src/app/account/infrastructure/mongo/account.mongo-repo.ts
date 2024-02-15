import { Injectable } from "@nestjs/common";
import { MongoRepository } from "../../../shared/abstract-repository/mongo-repository";
import { AccountMongoEntity } from "./account.mongo-entity";
import { Account } from "../../domain/account.interface";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

@Injectable()
export class AccountMongoRepository extends MongoRepository<
  AccountMongoEntity,
  Account
> {
  domainToEntity(d: Account): AccountMongoEntity {
    console.log(d);
    throw new Error("Method not implemented.");
  }
  entityToDomain(e: AccountMongoEntity): Account {
    console.log(e);
    throw new Error("Method not implemented.");
  }

  async getAccountByStore(name: ID): Promise<Account> {
    console.log(name);
    throw new Error("Method not implemented.");
  }
}
