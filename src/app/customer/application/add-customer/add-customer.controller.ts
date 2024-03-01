import { Body, Controller, Inject, Post } from "@nestjs/common";
import { customerPath } from "../../../shared/routes";
import { AddCustomerUseCase } from "./add-customer.usecase";
import { AddCustomerRequest } from "./add-customer.request";
import { AddCustomerCommand } from "./add-customer.command";
import { customerToDto } from "../../domain/customer.interface";

@Controller(customerPath)
export class AddCustomerController {
  constructor(
    @Inject(AddCustomerUseCase)
    private readonly useCase: AddCustomerUseCase,
  ) {}

  @Post()
  async addCustomer(@Body() request: AddCustomerRequest) {
    const pc = await this.useCase.addCustomer(new AddCustomerCommand(request));
    return customerToDto(pc);
  }
}
