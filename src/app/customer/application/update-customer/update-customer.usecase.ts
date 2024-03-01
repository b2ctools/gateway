import { Inject, Injectable } from "@nestjs/common";
import { CustomerService } from "../../domain/customer.service";
import { UpdateCustomerRequest } from "./update-customer.request";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

@Injectable()
export class UpdateCustomerUseCse {
  constructor(
    @Inject(CustomerService)
    private readonly customerService: CustomerService,
  ) {}

  async execute(id: ID, request: UpdateCustomerRequest) {
    return await this.customerService.updateCustomer(id, request);
  }
}
