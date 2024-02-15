import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export interface Credentials {
  email: string;
  password: string;
}

export class LoginRequest implements Credentials {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
