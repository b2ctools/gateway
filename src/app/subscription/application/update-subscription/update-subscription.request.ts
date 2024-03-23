
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateSubscriptionRequest {

    // @IsNotEmpty()
    // @IsString()
    // @IsOptional()
    // name: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    description: string
}
