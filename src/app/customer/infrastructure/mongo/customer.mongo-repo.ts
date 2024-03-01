import { Injectable } from "@nestjs/common";
import { MongoRepository } from "../../../shared/abstract-repository/mongo-repository";
import { CustomerMongoEntity } from "./customer.mongo-entity";
import { Customer } from "../../domain/customer.interface";
import { ID } from "../../../shared/abstract-repository/repository.interface";

@Injectable()
export class CustomerMongoRepository extends MongoRepository<
  CustomerMongoEntity,
  Customer
> {
  domainToEntity(d: Customer): CustomerMongoEntity {
    console.log(d);
    throw new Error("Method not implemented.");
  }
  entityToDomain(e: CustomerMongoEntity): Customer {
    console.log(e);
    throw new Error("Method not implemented.");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getCustomerByUserId(userId: ID): Promise<Customer> {
    console.log(name);
    throw new Error("Method not implemented.");
  }
}
