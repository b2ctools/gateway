import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { User, UserRole } from "../../domain/user.interface";
import { AddressRequest } from "src/app/shared/address/address.request";
import { Type } from "class-transformer";
export class RegisterUserRequest
  implements
    Omit<
      User,
      | "id"
      | "status"
      | "recoveryPasswordCode"
      | "failedLogin"
      | "isEmailConfirmed"
      | "isPhoneConfirmed"
    >
{
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  nickname: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  @IsOptional()
  avatar: string;

  @IsNotEmpty()
  @IsDateString({ strict: true })
  @IsOptional()
  birthDay: Date;

  @IsObject()
  @ValidateNested()
  @Type(() => AddressRequest)
  address: AddressRequest;
}
