import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { User, UserRole, UserStatus } from "../../domain/user.interface";
import { Optional } from "@nestjs/common";

export class UpdateUserRequest
{
  @IsNotEmpty()
  @IsString()
  id: ID;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  firstName: string;

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
  @IsOptional()
  status: UserStatus;
  
  @IsEnum(UserRole)
  @IsOptional()
  role: UserRole;
  
  @IsNotEmpty()
  @IsDateString()
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
