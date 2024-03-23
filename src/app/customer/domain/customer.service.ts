import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CustomerRepository } from "../infrastructure/customer-repository.type";
import { AddCustomerCommand } from "../application/add-customer/add-customer.command";
import { Customer } from "./customer.interface";
import {
  FindAllOutput,
  ID,
} from "../../shared/abstract-repository/repository.interface";
import { SearchRequest } from "../../shared/filters-and-request/base.request";
import { UpdateCustomerRequest } from "../application/update-customer/update-customer.request";
import { UserService } from "../../user/domain/user.service";
import { UserRole } from "../../user/domain/user.interface";

@Injectable()
export class CustomerService {
  constructor(
    @Inject("CustomerRepository")
    private readonly customerRepo: CustomerRepository,

    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  private async verifyExistingCustomer(userId: ID): Promise<void> {
    const existing = await this.customerRepo.getCustomerByUserId(userId);

    if (existing) {
      throw new BadRequestException(`Customer name  is already taken`);
    }

    // verifying customer role
    const { role } = await this.userService.findByIdOrFail(userId);
    if (role != UserRole.USER) {
      throw new BadRequestException(
        `Registered userid ${userId} is not a user [${role}]`,
      );
    }
  }

  async findByIdOrFail(customerId: ID) {
    const existingCustomer = await this.customerRepo.findById(customerId);
    if (!existingCustomer) {
      throw new BadRequestException(`Customer with id ${customerId} not found`);
    }
    return existingCustomer;
  }

  async addCustomer(command: AddCustomerCommand): Promise<Customer>{
    await this.verifyExistingCustomer(command.userId);

    const customer: Customer = {
      id: null,
      ...command,
    };

    return await this.customerRepo.create(customer);
  }

  async removeCustomer(id: ID) {
    const customer = await this.findByIdOrFail(id);
    const user = await this.userService.findByIdOrFail(customer.userId);
    await this.customerRepo.delete(id);
    await this.userService.removeUser_id(user.id);
  }

  async findAllCustomers(request: SearchRequest): Promise<FindAllOutput<Customer>> {
    return await this.customerRepo.findAll(request);
  }

  async updateCustomer(id: ID, request: UpdateCustomerRequest): Promise<Customer> {
    const { description } = request;
    const existingCustomer = await this.findByIdOrFail(id);

    existingCustomer.description = description
      ? description
      : existingCustomer.description;

    console.log( `Updating Customer - ${JSON.stringify(request)}`);
    return await this.customerRepo.persist(existingCustomer);
  }
}
