import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateCustomerRequest {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description: string;
}
