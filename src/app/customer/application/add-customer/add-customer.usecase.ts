import { Inject, Injectable } from "@nestjs/common";
import { CustomerService } from "../../domain/customer.service";
import { AddCustomerCommand } from "./add-customer.command";

@Injectable()
export class AddCustomerUseCase {
  constructor(
    @Inject(CustomerService)
    private readonly pcService: CustomerService,
  ) {}

  async addCustomer(command: AddCustomerCommand) {
    return await this.pcService.addCustomer(command);
  }
}
