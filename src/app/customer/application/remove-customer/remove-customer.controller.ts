import { Controller, Delete, Inject, Param } from "@nestjs/common";
import { customerPath } from "../../../shared/routes";
import { RemoveCustomerUseCase } from "./remove-customer.usecase";
import { ID } from "../../../shared/abstract-repository/repository.interface";

@Controller(customerPath)
export class RemoveCustomerController {
  constructor(
    @Inject(RemoveCustomerUseCase)
    private readonly useCase: RemoveCustomerUseCase,
  ) {}

  @Delete("/:id")
  async removeCustomer(@Param("id") id: ID) {
    await this.useCase.execute(id);
    return { message: "Customer succesfully removed" };
  }
}
