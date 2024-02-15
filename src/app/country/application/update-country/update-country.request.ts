import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import { Continent } from "../../domain/country.interface";

export class UpdateCountryRequest {
  @IsNotEmpty()
  @IsString()
  id: ID;

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
