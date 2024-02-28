import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ID } from "../../../shared/abstract-repository/repository.interface";

export class UpdatePermissionRequest {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description: string;
}
