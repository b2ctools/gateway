import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from "class-validator";
import { Billing, BillingCycle, Plan, PlanType } from "../../domain/plan.interface";
import { Type } from "class-transformer";

export class BillingRequest implements Billing {
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @IsEnum(BillingCycle)
  cycle: BillingCycle;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description?: string;
}

export class AddPlanRequest implements Omit<Plan, "id" | "resources"> {
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsString()
  @IsOptional()
  description?: string;
  
  @IsOptional()
  @ValidateIf((instance, billingProp) => Array.isArray(billingProp) && billingProp.length > 0)
  @IsArray()
  @ValidateNested()
  @Type(() => BillingRequest)
  billing: Billing[];
  
  @IsNotEmpty()
  @IsEnum(PlanType)
  type: PlanType;

  @IsOptional()
  @IsEnum(BillingCycle)
  defaultBillingCycle?: BillingCycle;
}
