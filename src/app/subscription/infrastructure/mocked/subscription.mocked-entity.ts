
import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { MockedEntity } from "../../../shared/abstract-repository/entities/mocked-entity";
import { Subscription, SubscriptionBilling, SubscriptionStatus } from "../../domain/subscription.interface";

export class SubscriptionMockedEntity extends MockedEntity implements Omit<Subscription, 'id'> {
    // name: string;
    description?: string;
    tenantId: ID;
    billing: SubscriptionBilling;
    startDate: Date;
    status: SubscriptionStatus;
    planId: ID;
}
