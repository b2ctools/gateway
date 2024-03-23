
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { subscriptionPath } from '../../../shared/routes';
import { AddSubscriptionUseCase } from './add-subscription.usecase';
import { AddSubscriptionRequest } from './add-subscription.request';
import { AddSubscriptionCommand } from './add-subscription.command';
import { SubscriptionDto } from '../../domain/subscription.interface';

@Controller(subscriptionPath)
export class AddSubscriptionController {
  constructor(
    @Inject(AddSubscriptionUseCase)
    private readonly useCase: AddSubscriptionUseCase
  ) {}

  @Post()
  async addSubscription(@Body() request: AddSubscriptionRequest): Promise<SubscriptionDto> {
    
    return await this.useCase.execute(
      new AddSubscriptionCommand(request)
    );
  }
}
