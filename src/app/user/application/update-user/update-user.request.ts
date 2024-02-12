import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { User, UserRole, UserStatus } from "../../domain/user.interface";
import { Optional } from "@nestjs/common";

export class UpdateUserRequest
  implements
    Partial<
      Omit<
        User,
        | "tenantId"
        | "status"
        | "role"
        | "isEmailVerified"
        | "isPhoneVerified"
        | "failedLogin"
        | "recoveryPasswordCode"
      >
    >
{
  @IsNotEmpty()
  @IsString()
  id: ID;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  nickname: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  avatar: string;

  @IsEnum(UserStatus)
  @Optional()
  status: UserStatus;
  
  @IsEnum(UserRole)
  @Optional()
  role: UserRole;
  
  @IsNotEmpty()
  @IsDateString()
  @Optional()
  birthDay: Date;

  @IsNotEmpty()
  @IsString()
  @Optional()
  address: string;

  @IsNotEmpty()
  @IsString()
  @Optional()
  city: string;

  @IsNotEmpty()
  @IsString()
  @Optional()
  state: string;

  @IsNotEmpty()
  @IsString()
  @Optional()
  zip: string;

  @IsNotEmpty()
  @IsString()
  @Optional()
  countryId: ID;

}
