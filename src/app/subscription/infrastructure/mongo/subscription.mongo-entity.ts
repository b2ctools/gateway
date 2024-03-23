
import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { MongoEntity } from "../../../shared/abstract-repository/entities/mongo-entity";
import { Subscription, SubscriptionBilling, SubscriptionStatus } from "../../domain/subscription.interface";

export class SubscriptionMongoEntity extends MongoEntity implements Omit<Subscription, 'id'>{
    // name: string;
    description?: string;
    tenantId: ID;
    billing: SubscriptionBilling;
    startDate: Date;
    status: SubscriptionStatus;
    planId: ID;
}
