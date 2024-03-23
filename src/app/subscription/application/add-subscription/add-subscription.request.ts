
import { IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsPositive, IsString, ValidateNested } from "class-validator";
import { Subscription, SubscriptionBilling } from "../../domain/subscription.interface"
import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { BillingCycle } from "src/app/plan/domain/plan.interface";
import { Type } from "class-transformer";

export class SubscriptionBillingRequest implements SubscriptionBilling {
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    price: number;
  
    @IsNotEmpty()
    @IsEnum(BillingCycle)
    cycle: BillingCycle;
  
  }

export class AddSubscriptionRequest implements Omit<Subscription, 'id' | 'tenantId' | 'startDate' | 'status'>{
    
    // @IsNotEmpty()
    // @IsString()
    // name: string;
    
    @IsString()
    @IsOptional()
    description?: string;
    
    @IsNotEmpty()
    @IsObject()
    @ValidateNested()
    @Type(() => SubscriptionBillingRequest)
    billing: SubscriptionBillingRequest;

    @IsNotEmpty()
    @IsString()
    planId: ID;

    @IsString()
    @IsOptional()
    tenantId?: ID;
}
