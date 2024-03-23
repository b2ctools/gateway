import { Inject, Injectable } from "@nestjs/common";
import { CustomerService } from "../../domain/customer.service";
import { AddCustomerCommand } from "./add-customer.command";
import { CustomerDto, customerToDto } from "../../domain/customer.interface";

@Injectable()
export class AddCustomerUseCase {
  constructor(
    @Inject(CustomerService)
    private readonly pcService: CustomerService,
  ) {}

  async addCustomer(command: AddCustomerCommand): Promise<CustomerDto> {
    const customer = await this.pcService.addCustomer(command);
    return customerToDto(customer);
  }
}
