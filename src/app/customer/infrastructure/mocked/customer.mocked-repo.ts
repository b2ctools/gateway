import { Injectable } from "@nestjs/common";
import { MockedRepository } from "../../../shared/abstract-repository/mocked-repository";
import { CustomerMockedEntity } from "./customer.mocked-entity";
import { Customer } from "../../domain/customer.interface";
import { ID } from "../../../shared/abstract-repository/repository.interface";

@Injectable()
export class CustomerMockedRepository extends MockedRepository<
  CustomerMockedEntity,
  Customer
> {
  domainToEntity(d: Customer): CustomerMockedEntity {
    const entity = new CustomerMockedEntity();

    entity.userId = d.userId;
    entity.description = d.description;
    return entity;
  }

  entityToDomain(e: CustomerMockedEntity): Customer {
    return {
      id: e._id,
      userId: e.userId,
      description: e.description,
    };
  }

  async getCustomerByUserId(userId: ID): Promise<Customer> {
    const { data: customers } = await this.findAll({});
    if (customers.length === 0) return null;
    const filtered = customers.filter((s) => s.userId === userId);
    return filtered.length > 0 ? filtered.shift() : null;
  }
}
