import { IsNotEmpty, IsString } from "class-validator"

export interface IRefreshToken {
    accessToken: string;
    refreshToken: string;
}

export class RefreshTokenRequest implements IRefreshToken {
    @IsNotEmpty()
    @IsString()
    accessToken: string;

    @IsNotEmpty()
    @IsString()
    refreshToken: string;
}