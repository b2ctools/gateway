import { Body, Controller, Inject, Param, Patch } from "@nestjs/common";
import { customerPath } from "../../../shared/routes";
import { customerToDto } from "../../domain/customer.interface";
import { UpdateCustomerUseCse } from "./update-customer.usecase";
import { UpdateCustomerRequest } from "./update-customer.request";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

@Controller(customerPath)
export class UpdateCustomerController {
  constructor(
    @Inject(UpdateCustomerUseCse)
    private readonly useCase: UpdateCustomerUseCse,
  ) {}

  @Patch(":id")
  async updateCustomer(
    @Param("id") id: ID,
    @Body() request: UpdateCustomerRequest,
  ) {
    const pc = await this.useCase.execute(id, request);
    return customerToDto(pc);
  }
}
