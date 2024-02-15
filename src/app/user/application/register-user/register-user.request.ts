import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import { User, UserRole } from "../../domain/user.interface";
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

  @IsNotEmpty()
  @IsNumber()
  tenantId: ID;

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

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  address: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  city: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  state: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  zip: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  countryId: ID;
}
