import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateIf, ValidateNested } from "class-validator";
import { Billing, BillingCycle, Plan, PlanType } from "../../domain/plan.interface";
import { BillingRequest } from "../add-plan/add-plan.request";
import { Type } from "class-transformer";

export class UpdatePlanRequest implements Omit<Plan, "id" | "resources">  {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description: string;

  @IsOptional()
  @ValidateIf((instance, billingProp) => Array.isArray(billingProp) && billingProp.length > 0)
  @IsArray()
  @ValidateNested()
  @Type(() => BillingRequest)
  billing: Billing[];

  @IsNotEmpty()
  @IsEnum(PlanType)
  @IsOptional()
  type: PlanType;

  @IsOptional()
  @IsEnum(BillingCycle)
  @IsOptional()
  defaultBillingCycle?: BillingCycle;
}
