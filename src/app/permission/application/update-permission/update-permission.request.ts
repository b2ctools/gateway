import { IsNotEmpty, IsOptional, IsString } from "class-validator";

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
