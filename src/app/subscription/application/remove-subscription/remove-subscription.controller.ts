
import { Controller, Delete, Inject, Param } from '@nestjs/common';
import { subscriptionPath } from '../../../shared/routes';
import { RemoveSubscriptionUseCase } from './remove-subscription.usecase';
import { ID } from '../../../shared/abstract-repository/repository.interface';

@Controller(subscriptionPath)
export class RemoveSubscriptionController {
  constructor(
    @Inject(RemoveSubscriptionUseCase)
    private readonly useCase: RemoveSubscriptionUseCase
  ) {}

  @Delete('/:id')
  async removeSubscription(@Param('id') id: ID) {
    await this.useCase.execute(id);
    return { message: 'Subscription succesfully removed' };
  }
}
