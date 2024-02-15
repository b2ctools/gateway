import { Injectable } from "@nestjs/common";
import { MongoRepository } from "../../../shared/abstract-repository/mongo-repository";

import { User } from "../../domain/user.interface";
import { UserMongoEntity } from "./user.mongo-entity";

@Injectable()
export class UserMongoRepository extends MongoRepository<
  UserMongoEntity,
  User
> {
  domainToEntity(d: User): UserMongoEntity {
    console.log(d);
    throw new Error("Method not implemented.");
  }
  entityToDomain(e: UserMongoEntity): User {
    console.log(e);
    throw new Error("Method not implemented.");
  }

  async getUserByEmail(email: string) {
    console.log(email);
    throw new Error("Method not implemented.");
  }
}
