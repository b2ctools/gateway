
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ID } from "../../../shared/abstract-repository/repository.interface";

export class UpdateProductCategoryRequest {

    @IsNotEmpty()
    @IsString()
    id: ID

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    description: string
}