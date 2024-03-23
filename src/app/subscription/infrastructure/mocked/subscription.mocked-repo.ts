
import { Injectable } from '@nestjs/common';
import { MockedRepository } from '../../../shared/abstract-repository/mocked-repository';
import { SubscriptionMockedEntity } from './subscription.mocked-entity';
import { Subscription } from '../../domain/subscription.interface';

@Injectable()
export class SubscriptionMockedRepository extends MockedRepository<
  SubscriptionMockedEntity,
  Subscription
> {
  domainToEntity(d: Subscription): SubscriptionMockedEntity {
    const entity = new SubscriptionMockedEntity();

    // entity.name = d.name;
    entity.description = d.description;
    entity.billing = d.billing;
    entity.startDate = d.startDate;
    entity.status = d.status;
    entity.planId = d.planId;
    entity.tenantId = d.tenantId;
    
    return entity;
  }

  entityToDomain(e: SubscriptionMockedEntity): Subscription {
    return {
      id: e._id,
      // name: e.name,
      description: e.description,
      billing: e.billing,
      startDate: e.startDate,
      status: e.status,
      planId: e.planId,
      tenantId: e.tenantId,

      
    };
  }

  // async getSubscriptionByName(name: string): Promise<Subscription> {
  //   const { data: subscriptions} = await this.findAll({});
  //   if (subscriptions.length === 0) return null;
  //   const filtered = subscriptions.filter((s) => s.name === name);
  //   return filtered.length > 0 ? filtered.shift() : null;
  // }

}
