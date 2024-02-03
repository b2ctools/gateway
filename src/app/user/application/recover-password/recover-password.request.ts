import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RecoverPasswordRequest {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  recoveryPasswordToken: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
