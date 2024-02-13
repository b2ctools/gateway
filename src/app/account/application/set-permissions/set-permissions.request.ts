import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

export class SetPermissionsRequest {
    @IsNotEmpty()
    @IsString()
    id: ID;

    @IsArray()
    @IsString({ each: true })
    permissions: ID[];
}