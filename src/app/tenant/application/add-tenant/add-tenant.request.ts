import { IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { Tenant } from "../../domain/tenant.interface";
import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { AddressRequest } from "src/app/shared/address/address.request";
import { Type } from "class-transformer";

export class AddTenantRequest
  implements Omit<Tenant, "id" | "planId" | "state">
{

  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsString()
  @IsOptional()
  description?: string;

  @IsObject()
  @ValidateNested()
  @Type(() => AddressRequest)
  address: AddressRequest;

  @IsString()
  @IsOptional()
  logo: string;

  @IsString()
  @IsOptional()
  primaryOwnerId: ID;
}
