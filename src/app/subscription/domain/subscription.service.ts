
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { SubscriptionRepository } from '../infrastructure/subscription-repository.type';
import { AddSubscriptionCommand } from '../application/add-subscription/add-subscription.command';
import {
  Subscription,
} from './subscription.interface';
import { FindAllOutput, ID } from '../../shared/abstract-repository/repository.interface';
import { SearchRequest } from '../../shared/filters-and-request/base.request';
import { UpdateSubscriptionRequest } from '../application/update-subscription/update-subscription.request';

@Injectable()
export class SubscriptionService {
  constructor(
    @Inject('SubscriptionRepository')
    private readonly subscriptionRepo: SubscriptionRepository
  ) {}

  // private async verifySubscriptionName(name: string): Promise<void> {
  //   const existing = await this.subscriptionRepo.getSubscriptionByName(name);

  //   if (existing) {
  //     throw new BadRequestException(
  //       `Subscription name  is already taken`
  //     );
  //   }
  // }

  async findByIdOrFail(subscriptionId: ID){
    const existingSubscription = await this.subscriptionRepo.findById(subscriptionId)
    if (!existingSubscription){
      throw new BadRequestException(`Subscription with id ${subscriptionId} not found`);
    }
    return existingSubscription;
  }

  async addSubscription(command: AddSubscriptionCommand): Promise<Subscription> {
    // await this.verifySubscriptionName(command.name);
    
    const subscription: Subscription = {
      id: null,
      ...command,      
    }

    return await this.subscriptionRepo.create(subscription);
  }

  async removeSubscription(id: ID) {
    await this.subscriptionRepo.delete(id);
  }

  async findAllSubscriptions(request: SearchRequest): Promise<FindAllOutput<Subscription>> {
    return await this.subscriptionRepo.findAll(request);
  }

  async updateSubscription(id: ID, request: UpdateSubscriptionRequest): Promise<Subscription> {
    const { description } = request;
    const existingSubscription = await this.findByIdOrFail(id);

    // existingSubscription.name = name ? name : existingSubscription.name;
    existingSubscription.description = description ? description : existingSubscription.description;

    console.log(
      `Updating Subscription - ${JSON.stringify({
        id,
        name,
        description,
      })}`
    );
    return await this.subscriptionRepo.persist(existingSubscription);
  }
}
