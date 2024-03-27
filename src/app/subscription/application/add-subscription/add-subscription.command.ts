import { ID } from "src/app/shared/abstract-repository/repository.interface";
import {
  Subscription,
  SubscriptionBilling,
  SubscriptionStatus,
} from "../../domain/subscription.interface";
import { AddSubscriptionRequest } from "./add-subscription.request";

export class AddSubscriptionCommand implements Omit<Subscription, "id"> {
  // name: string;
  description?: string;
  startDate: Date;
  status: SubscriptionStatus;
  billing: SubscriptionBilling;
  planId: ID;
  tenantId: ID;

  constructor(request: AddSubscriptionRequest) {
    const { description, billing, planId, tenantId } = request;
    // this.name = name;
    this.description = description;
    this.billing = billing;
    this.planId = planId;
    this.startDate = new Date();
    this.status = SubscriptionStatus.PENDING;
    this.tenantId = tenantId;
  }
}
