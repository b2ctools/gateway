import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Sample } from "../../domain/sample.interface";
import { Type } from "class-transformer";
import {
  ILocations,
  IUnit,
  PriceRequest,
  WeightRequest,
  allowedUnits,
} from "../common.request";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

export class AddSampleRequest
  implements Omit<Sample, "id" | "tenantId" | "hidden">
{
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  // @ArrayNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images: string[];

  @IsObject()
  @ValidateNested()
  @Type(() => PriceRequest)
  price: PriceRequest;

  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @IsEnum(allowedUnits)
  unit: IUnit;

  @IsObject()
  @ValidateNested()
  @Type(() => WeightRequest)
  weight: WeightRequest;

  @IsNotEmpty()
  @IsString()
  categoryId: number;

  @IsNotEmpty()
  @IsString()
  storeId: number;

  @IsNotEmpty()
  @IsString()
  brandId: number;

  @IsNotEmpty()
  @IsString()
  countryId: number;

  @IsArray()
  @IsString({ each: true })
  locations: ILocations;

  @IsString()
  @IsOptional()
  tenantId: ID;
}
