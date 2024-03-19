import { IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { Tenant, TenantState } from "../../domain/tenant.interface";
import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { AddressRequest } from "src/app/shared/address/address.request";
import { Type } from "class-transformer";
export class UpdateTenantRequest implements Omit<Tenant, "id" | "planId">{
  
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name: string;
  
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description: string;

  @IsObject()
  @ValidateNested()
  @Type(() => AddressRequest)
  @IsOptional()
  address: AddressRequest;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  logo: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  primaryOwnerId: ID;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  state: TenantState;
}
