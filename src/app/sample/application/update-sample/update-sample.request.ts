
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

import { Type } from "class-transformer";
import { Sample } from "../../domain/sample.interface";
import { ILocations, IUnit, PriceRequest, WeightRequest, allowedUnits } from "../common.request";
import { ID } from "../../../shared/abstract-repository/repository.interface";

export class UpdateSampleRequest implements Partial<Omit<Sample, 'tenantId' | 'hidden'>> {

    @IsNotEmpty()
    @IsString()
    id: ID;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    name: string;
    
    @IsString()
    @IsOptional()
    description: string;
    
    // @ArrayNotEmpty()
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    images: string[];
    
    @IsObject()
    @IsOptional()
    @ValidateNested()
    @Type(() => PriceRequest)
    price: PriceRequest;

    @IsNotEmpty()
    @IsNumber()
    @IsOptional()
    stock: number;

    @IsEnum(allowedUnits)
    @IsOptional()
    unit: IUnit;

    @IsObject()
    @IsOptional()
    @ValidateNested()
    @Type(() => WeightRequest)
    weight: WeightRequest;
    
    @IsNotEmpty()
    @IsOptional()
    @IsNumber()
    categoryId: ID;

    @IsNotEmpty()
    @IsOptional()
    @IsNumber()
    storeId: number;

    @IsNotEmpty()
    @IsOptional()
    @IsNumber()
    brandId: number;

    @IsNotEmpty()
    @IsOptional()
    @IsNumber()
    countryId: number;

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    locations: ILocations;
}