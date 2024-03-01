import { Module } from "@nestjs/common";
import { getCustomerRepo } from "./infrastructure/customer.repo-provider";
import { AddCustomerController } from "./application/add-customer/add-customer.controller";
import { AddCustomerUseCase } from "./application/add-customer/add-customer.usecase";
import { CustomerService } from "./domain/customer.service";
import { SearchCustomerController } from "./application/search-customer/search-customer.controller";
import { SearchCustomerUseCase } from "./application/search-customer/search-customer.usecase";
import { RemoveCustomerController } from "./application/remove-customer/remove-customer.controller";
import { RemoveCustomerUseCase } from "./application/remove-customer/remove-customer.usecase";
import { UpdateCustomerController } from "./application/update-customer/update-customer.controller";
import { UpdateCustomerUseCse } from "./application/update-customer/update-customer.usecase";
import { UserModule } from "../user/user.module";

@Module({
  imports: [UserModule],
  controllers: [
    AddCustomerController,
    SearchCustomerController,
    RemoveCustomerController,
    UpdateCustomerController,
  ],
  providers: [
    AddCustomerUseCase,
    SearchCustomerUseCase,
    RemoveCustomerUseCase,
    UpdateCustomerUseCse,
    CustomerService,
    getCustomerRepo(),
  ],
  exports: [CustomerService],
})
export class CustomerModule {}
