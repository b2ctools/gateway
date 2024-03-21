import { IsOptional, IsString } from "class-validator";
import { ID } from "../abstract-repository/repository.interface";
import { IAddress } from "./address.interface";

export class AddressRequest implements IAddress {
    @IsString()
    address: string;

    @IsString()
    @IsOptional()
    address2?: string;

    @IsString()
    @IsOptional()
    street?: string;

    @IsString()
    @IsOptional()
    city?: string;

    @IsString()
    @IsOptional()
    state?: string;

    @IsString()
    @IsOptional()
    zip?: string;

    @IsString()
    @IsOptional()
    country?: ID;

    @IsString()
    @IsOptional()
    latitude?: string;

    @IsString()
    @IsOptional()
    longitude?: string;
}