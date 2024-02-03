import { Optional } from "@nestjs/common";
import { IsNotEmpty, IsString } from "class-validator";
import { Store } from "../../domain/store.interface";

export class AddStoreRequest implements Omit<Store, 'id' | 'tenantId'> {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    @Optional()
    description: string;
}