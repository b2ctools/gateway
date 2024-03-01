import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Tenant } from "../../domain/tenant.interface";
import { ID } from "src/app/shared/abstract-repository/repository.interface";
export class UpdateTenantRequest implements Omit<Tenant, "id" | "planId">{
  
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name: string;
  
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  address: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  logo: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  primaryOwnerId: ID;
}
