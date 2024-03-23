
import { Controller, Get, Inject, Query } from '@nestjs/common';
import { SearchSubscriptionUseCase } from './search-subscription.usecase';
import { SubscriptionDto } from '../../domain/subscription.interface';
import { subscriptionPath } from '../../../shared/routes';
import { SearchOutput, SearchRequest } from '../../../shared/filters-and-request/base.request';

@Controller(subscriptionPath)
export class SearchSubscriptionController {
  constructor(
    @Inject(SearchSubscriptionUseCase)
    private readonly useCase: SearchSubscriptionUseCase
  ) {}

  @Get()
  async findAllSubscriptions(@Query() request: SearchRequest): Promise<SearchOutput<SubscriptionDto>> {
    return await this.useCase.execute(request)
    
  }
}

