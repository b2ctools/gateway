
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Permission } from "../../domain/permission.interface"

export class AddPermissionRequest implements Omit<Permission, 'id' | 'tenantId'>{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

}
