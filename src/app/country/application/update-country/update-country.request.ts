import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Continent } from "../../domain/country.interface";

export class UpdateCountryRequest {

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  code: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  continent: Continent;
}
