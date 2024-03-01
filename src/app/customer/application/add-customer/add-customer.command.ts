import { ID } from "../../../shared/abstract-repository/repository.interface";
import { Customer } from "../../domain/customer.interface";
import { AddCustomerRequest } from "./add-customer.request";

export class AddCustomerCommand implements Omit<Customer, "id" | "tenantId"> {
  userId: ID;
  description?: string;
  parent: ID;

  constructor(request: AddCustomerRequest) {
    const { userId, description } = request;
    this.userId = userId;
    this.description = description;
  }
}
