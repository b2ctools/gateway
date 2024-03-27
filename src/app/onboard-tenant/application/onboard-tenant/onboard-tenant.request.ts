import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { BillingCycle } from "src/app/plan/domain/plan.interface";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

class OwnerRequest {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    phone: string;
}

class CompanyRequest {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsString()
    @IsOptional()
    address2: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    state: string;

    @IsNotEmpty()
    @IsString()
    country: string;

    @IsNotEmpty()
    @IsString()
    zip: string;

    @IsString()
    @IsOptional()
    lat: string;

    @IsString()
    @IsOptional()
    long: string;
}

class PlanRequest {
    @IsNotEmpty()
    @IsString()
    id: ID;

    @IsNotEmpty()
    @IsString()
    subscription: BillingCycle;
    // name: string;
}

export class OnboardTenantRequest {
    @IsNotEmpty()
    @IsObject()
    @ValidateNested()
    @Type(() => OwnerRequest)
    owner: OwnerRequest;

    @IsNotEmpty()
    @IsObject()
    @ValidateNested()
    @Type(() => CompanyRequest)
    company: CompanyRequest;

    @IsNotEmpty()
    @IsObject()
    @ValidateNested()
    @Type(() => PlanRequest)
    plan: PlanRequest;
}