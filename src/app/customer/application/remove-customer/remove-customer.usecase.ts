import { Inject, Injectable } from "@nestjs/common";
import { CustomerService } from "../../domain/customer.service";
import { ID } from "../../../shared/abstract-repository/repository.interface";

@Injectable()
export class RemoveCustomerUseCase {
  constructor(
    @Inject(CustomerService)
    private readonly customerService: CustomerService,
  ) {}

  async execute(customerId: ID) {
    await this.customerService.findByIdOrFail(customerId);
    await this.customerService.removeCustomer(customerId);
  }
}
