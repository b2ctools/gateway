import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import { UserRole, UserStatus } from "../../domain/user.interface";

export class UpdateUserRequest {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  nickname: string;

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
