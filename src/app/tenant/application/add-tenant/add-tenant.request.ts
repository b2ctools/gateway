import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Tenant, TenantAddress } from "../../domain/tenant.interface";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

export class AddTenantRequest
  implements Omit<Tenant, "id" | "planId">
{
  
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  address: TenantAddress;

  @IsString()
  @IsOptional()
  logo: string;

  @IsString()
  @IsOptional()
  primaryOwnerId?: ID;
}
