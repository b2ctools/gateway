
import { Billing, PlanRef } from 'src/app/plan/domain/plan.interface';
import { IDomain } from '../../shared/abstract-repository/entities/domain';
import { ID } from 'src/app/shared/abstract-repository/repository.interface';
import { TenantRef } from 'src/app/tenant/domain/tenant.interface';

export interface SubscriptionBilling extends Omit<Billing, 'description'>{}
export enum SubscriptionStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  CANCELED = 'canceled',
  PENDING = 'pending'
}

export interface Subscription extends IDomain {
  // name: string;
  description?: string;
  billing: SubscriptionBilling;
  startDate: Date;
  status: SubscriptionStatus;
  planId: ID;
  tenantId: ID;
}

export interface SubscriptionDto extends Omit<Subscription, 'planId' | 'tenantId'>{
  plan: PlanRef;
  tenant: TenantRef;
}

export const subscriptionToDto = (sub: Subscription, tenant: TenantRef=null, plan: PlanRef=null): SubscriptionDto => {
  delete sub.planId;
  delete sub.tenantId;

  return {
    ...sub,
    plan,
    tenant
  }
};

export const sortable = [
  'name',
  'description',  
]


