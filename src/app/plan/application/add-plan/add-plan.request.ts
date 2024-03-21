import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from "class-validator";
import { Billing, BillingCycle, Plan } from "../../domain/plan.interface";
import { Type } from "class-transformer";

class BillingRequest implements Billing {
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @IsEnum(BillingCycle)
  cycle: BillingCycle;

}

export class AddPlanRequest implements Omit<Plan, "id" | "resources"> {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @ValidateIf((instance, billingProp) => billingProp.length > 0)
  @IsArray()
  @ValidateNested()
  @Type(() => BillingRequest)
  billing: Billing[];

  isCustom: boolean;
}
