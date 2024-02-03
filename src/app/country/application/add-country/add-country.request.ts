
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Continent, Country } from "../../domain/country.interface"

export class AddCountryRequest implements Omit<Country, 'id' | 'tenantId'>{
    
    @IsNotEmpty()
    @IsString()
    code: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    continent?: Continent;

}
