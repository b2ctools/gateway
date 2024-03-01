import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Customer } from "../../domain/customer.interface";
import { ID } from "../../../shared/abstract-repository/repository.interface";

export class AddCustomerRequest implements Omit<Customer, "id" | "tenantId"> {
  @IsNotEmpty()
  @IsString()
  userId: ID;

  @IsString()
  @IsOptional()
  description?: string;
}
