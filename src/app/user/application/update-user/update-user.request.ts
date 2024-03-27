import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { UserRole, UserStatus } from "../../domain/user.interface";
import { AddressRequest } from "src/app/shared/address/address.request";
import { Type } from "class-transformer";

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

  @IsObject()
  @ValidateNested()
  @Type(() => AddressRequest)
  @IsOptional()
  address: AddressRequest;


}
