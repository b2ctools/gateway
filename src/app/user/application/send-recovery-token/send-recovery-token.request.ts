import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SendRecoveryPasswordCodeRequest {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
}