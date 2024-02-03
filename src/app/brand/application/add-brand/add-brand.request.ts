
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Brand } from "../../domain/brand.interface"

export class AddBrandRequest implements Omit<Brand, 'id' | 'tenantId'>{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

}
