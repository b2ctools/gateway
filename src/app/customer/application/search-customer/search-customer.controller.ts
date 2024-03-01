import { Controller, Get, Inject, Query } from "@nestjs/common";
import { SearchCustomerUseCase } from "./search-customer.usecase";
import {
  CustomerDto,
  sortable,
  customerToDto,
} from "../../domain/customer.interface";
import { customerPath } from "../../../shared/routes";
import { SearchOutput, SearchRequest } from "../../../shared/base.request";

@Controller(customerPath)
export class SearchCustomerController {
  constructor(
    @Inject(SearchCustomerUseCase)
    private readonly useCase: SearchCustomerUseCase,
  ) {}

  @Get()
  async findAllCustomers(
    @Query() request: SearchRequest,
  ): Promise<SearchOutput<CustomerDto>> {
    const { count, data } = await this.useCase.execute(request);
    const items = data.map((s) => customerToDto(s));
    return {
      count,
      data: items,
      sortable,
    };
  }
}
