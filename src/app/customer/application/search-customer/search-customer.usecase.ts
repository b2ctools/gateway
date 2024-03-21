import { Inject, Injectable } from "@nestjs/common";
import { CustomerService } from "../../domain/customer.service";
import {
  SearchRequest,
  sanitazeSearchQueryParams,
} from "../../../shared/filters-and-request/base.request";
import { sortable } from "../../domain/customer.interface";

@Injectable()
export class SearchCustomerUseCase {
  constructor(
    @Inject(CustomerService)
    private readonly customerService: CustomerService,
  ) {}

  async execute(request: SearchRequest) {
    return await this.customerService.findAllCustomers(
      sanitazeSearchQueryParams<SearchRequest>(request, sortable),
    );
  }
}
