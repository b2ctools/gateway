
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Tenant } from "../../domain/tenant.interface"

export class AddTenantRequest implements Omit<Tenant, 'id' | 'tenantId'>{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

}
